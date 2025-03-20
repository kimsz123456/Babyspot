package com.ssafy.babyspot.domain.member.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.ssafy.babyspot.api.oauth.service.TokenService;
import com.ssafy.babyspot.domain.member.Baby;
import com.ssafy.babyspot.domain.member.Member;
import com.ssafy.babyspot.domain.member.dto.SignUpRequest;
import com.ssafy.babyspot.domain.member.dto.SignUpToken;
import com.ssafy.babyspot.domain.member.repository.MemberRepository;
import com.ssafy.babyspot.exception.CustomException;

import jakarta.transaction.Transactional;

@Service
public class MemberService {

	private final MemberRepository memberRepository;
	private final TokenService tokenService;

	@Autowired
	public MemberService(MemberRepository memberRepository, TokenService tokenService) {
		this.memberRepository = memberRepository;
		this.tokenService = tokenService;
	}

	@Transactional
	public Optional<Member> findByProviderId(String providerId) {
		return memberRepository.findByProviderId(providerId);
	}

	@Transactional
	public Member createMember(String providerId, SignUpRequest signUpRequest) {
		Optional<Member> existingMember = findByProviderId(providerId);
		if (existingMember.isPresent()) {
			throw new CustomException(HttpStatus.BAD_REQUEST, "이미 존재하는 사용자입니다.");
		}

		Member newMember = Member.builder()
			.providerId(providerId)
			.nickname(signUpRequest.getNickname())
			.profileImg(signUpRequest.getProfileImgUrl())
			.build();

		List<Integer> birthYears = signUpRequest.getBirthYears() != null
			? signUpRequest.getBirthYears()
			: new ArrayList<>();

		if (signUpRequest.getBirthYears() != null) {
			signUpRequest.getBirthYears().forEach(birthYear -> {
				Baby baby = Baby.builder()
					.member(newMember)
					.birthYear(birthYear)
					.build();
				newMember.getBabies().add(baby);
			});
		}

		return memberRepository.save(newMember);
	}

	@Transactional
	public SignUpToken signUpToken(String providerId, SignUpRequest signUpRequest, String registrationId) {
		Member newMember = createMember(providerId, signUpRequest);

		String jwtAccessToken = tokenService.createAccessToken(newMember.getId(), registrationId);
		String jwtRefreshToken = tokenService.createRefreshToken(newMember.getId(), registrationId);

		return new SignUpToken(newMember, jwtAccessToken, jwtRefreshToken);
	}

}
