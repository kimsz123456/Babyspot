package com.ssafy.babyspot.domain.member.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.ssafy.babyspot.api.oauth.service.TokenService;
import com.ssafy.babyspot.api.s3.S3Component;
import com.ssafy.babyspot.domain.member.Baby;
import com.ssafy.babyspot.domain.member.Member;
import com.ssafy.babyspot.domain.member.dto.SignUpRequest;
import com.ssafy.babyspot.domain.member.dto.SignUpToken;
import com.ssafy.babyspot.domain.member.dto.UpdateProfileRequest;
import com.ssafy.babyspot.domain.member.dto.UpdateProfileResponse;
import com.ssafy.babyspot.domain.member.repository.BabyRepository;
import com.ssafy.babyspot.domain.member.repository.MemberRepository;
import com.ssafy.babyspot.exception.CustomException;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class MemberService {

	private final MemberRepository memberRepository;
	private final TokenService tokenService;
	private final S3Component s3Component;
	private final BabyRepository babyRepository;

	@Value("${CLOUDFRONT_URL}")
	private String CLOUDFRONT_URL;

	@Autowired
	public MemberService(MemberRepository memberRepository, TokenService tokenService, S3Component s3Component,
		BabyRepository babyRepository) {
		this.memberRepository = memberRepository;
		this.tokenService = tokenService;
		this.s3Component = s3Component;
		this.babyRepository = babyRepository;
	}

	@Transactional
	public Optional<Member> findByProviderId(String providerId) {
		return memberRepository.findByProviderId(providerId);
	}

	@Transactional
	public Optional<Member> findById(int memberId) {
		return memberRepository.findById(memberId);
	}

	@Transactional
	public String findByProfileImgKey(String memberId) {
		return memberRepository.findByProfileImg(Integer.valueOf(memberId)).orElse(null);
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

	@Transactional
	public UpdateProfileResponse updateProfile(String memberId, UpdateProfileRequest request) {
		Member member = memberRepository.findById(Integer.valueOf(memberId))
			.orElseThrow(() -> new CustomException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다."));

		if (request.getNickname() != null && !request.getNickname().isEmpty()) {
			member.setNickname(request.getNickname());
		}

		String profileKey = findByProfileImgKey(memberId);
		String preSignedUrl = null;
		if (request.getProfileImgUrl() != null && !request.getProfileImgUrl().isEmpty()) {
			if (profileKey == null) {
				Map<String, String> imgPreSignedUrl = s3Component.generateProfilePreSignedUrl(
					memberId,
					request.getProfileImgUrl(),
					request.getContentType()
				);
				profileKey = imgPreSignedUrl.get("profileKey");
				preSignedUrl = imgPreSignedUrl.get("profileImgPreSignedUrl");

				member.setProfileImg(profileKey);
			} else {
				preSignedUrl = s3Component.generatePreSignedUrlForProfileImageUpdate(
					profileKey,
					request.getContentType()
				);
			}
		}

		if (request.getBabyAges() != null && !request.getBabyAges().isEmpty()) {
			babyRepository.deleteByMemberId(Integer.parseInt(memberId));

			List<Baby> newBabies = new ArrayList<>();
			for (Integer birthYear : request.getBabyAges()) {
				Baby baby = Baby.builder()
					.member(member)
					.birthYear(birthYear)
					.build();
				newBabies.add(baby);
			}
			if (!newBabies.isEmpty()) {
				babyRepository.saveAll(newBabies);
			}
		}

		memberRepository.save(member);

		return UpdateProfileResponse.fromMember(member, CLOUDFRONT_URL, preSignedUrl);
	}

	@Transactional
	public void deleteMember(int memberId) {
		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new EntityNotFoundException("회원정보가 없습니다."));

		List<Baby> babies = babyRepository.findByMember_Id(memberId);
		for (Baby baby : babies) {
			baby.setDeleted(true);
			babyRepository.save(baby);
		}
		member.setDeleted(true);
		memberRepository.save(member);
	}

	@Transactional
	public Optional<Member> findByProviderIdAndDeletedFalse(String providerId) {
		return memberRepository.findByProviderIdAndDeletedFalse(providerId);
	}
}
