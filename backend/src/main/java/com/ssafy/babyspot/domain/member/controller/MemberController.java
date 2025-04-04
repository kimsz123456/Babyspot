package com.ssafy.babyspot.domain.member.controller;

import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.babyspot.api.oauth.service.TokenService;
import com.ssafy.babyspot.api.s3.S3Component;
import com.ssafy.babyspot.domain.member.Member;
import com.ssafy.babyspot.domain.member.dto.MemberResponse;
import com.ssafy.babyspot.domain.member.dto.SignUpRequest;
import com.ssafy.babyspot.domain.member.dto.SignUpResponse;
import com.ssafy.babyspot.domain.member.dto.SignUpToken;
import com.ssafy.babyspot.domain.member.dto.UpdateProfileRequest;
import com.ssafy.babyspot.domain.member.dto.UpdateProfileResponse;
import com.ssafy.babyspot.domain.member.repository.MemberRepository;
import com.ssafy.babyspot.domain.member.service.MemberService;
import com.ssafy.babyspot.exception.CustomException;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/members")
public class MemberController {

	private final MemberRepository memberRepository;
	@Value("${CLOUDFRONT_URL}")
	private String CLOUDFRONT_URL;

	private final MemberService memberService;
	private final TokenService tokenService;
	private final S3Component s3Component;

	private final static Logger logger = LoggerFactory.getLogger(MemberController.class);

	public MemberController(MemberService memberService, TokenService tokenService, S3Component s3Component,
		MemberRepository memberRepository) {
		this.memberService = memberService;
		this.tokenService = tokenService;
		this.s3Component = s3Component;
		this.memberRepository = memberRepository;
	}

	@GetMapping("/me")
	public ResponseEntity<MemberResponse> getCurrentMember(Authentication authentication) {
		if (authentication == null || !authentication.isAuthenticated()) {
			throw new CustomException(HttpStatus.UNAUTHORIZED, "로그인이 필요합니다.");
		}

		String memberId = authentication.getName();
		Optional<Member> member = memberService.findById(Integer.parseInt(memberId));

		return member.map(value -> ResponseEntity.ok(MemberResponse.fromMember(value, CLOUDFRONT_URL)))
			.orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED)
				.body(MemberResponse.withMessage("로그인된 사용자를 찾을 수 없습니다.")));
	}

	@DeleteMapping("/delete")
	public ResponseEntity<Void> deleteCurrentMember(Authentication authentication) {
		if (authentication == null || !authentication.isAuthenticated()) {
			throw new CustomException(HttpStatus.FORBIDDEN, "인증이 필요합니다.");
		}

		int authenticatedId = Integer.parseInt(authentication.getName());
		memberService.deleteMember(authenticatedId);

		return ResponseEntity.noContent().build();
	}

	@PostMapping("/signup")
	public ResponseEntity<SignUpResponse> signUp(
		@RequestBody @Valid SignUpRequest signUpRequest,
		@RequestHeader(value = "X-Temp-Token", required = false) String tempToken
	) {
		if (tempToken == null || !tokenService.validateToken(tempToken)) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
				.body(new SignUpResponse("유효한 인증정보가 없습니다. 다시 로그인해주세요.", null, null));
		}

		String providerId = tokenService.getProviderId(tempToken);
		String registrationId = tokenService.getRegistrationId(tempToken);
		logger.info("provider id: " + providerId + ", registration id: " + registrationId);

		try {
			SignUpToken result = memberService.signUpToken(providerId, signUpRequest, registrationId);
			logger.info("signup result: " + result);
			return ResponseEntity.ok(
				new SignUpResponse("회원가입 완료", result.getAccessToken(), result.getRefreshToken()));
		} catch (IllegalArgumentException e) {
			return ResponseEntity.badRequest()
				.body(new SignUpResponse(e.getMessage(), null, null));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body(new SignUpResponse("회원가입 실패", null, null));
		}
	}

	@PostMapping("/signup/imgpresigned-url")
	public ResponseEntity<Map<String, String>> generateImgPreSignedUrl(@RequestParam String profileName,
		@RequestParam String contentType,
		Authentication authentication) {
		String memberId = authentication.getName();

		Map<String, String> preSignedUrls = s3Component.generateProfilePreSignedUrl(memberId, profileName, contentType);
		String profileKey = preSignedUrls.get("profileKey");

		Member member = memberRepository.findById(Integer.parseInt(memberId))
			.orElseThrow(() -> new CustomException(HttpStatus.NOT_FOUND, "회원이 존재하지 않습니다."));
		member.setProfileImg(profileKey);
		memberRepository.save(member);

		return ResponseEntity.ok(preSignedUrls);
	}

	@PatchMapping("/update")
	public ResponseEntity<UpdateProfileResponse> updateProfile(@RequestBody UpdateProfileRequest request,
		Authentication authentication) {
		String memberId = authentication.getName();
		UpdateProfileResponse response = memberService.updateProfile(memberId, request);

		return ResponseEntity.ok(response);
	}
}
