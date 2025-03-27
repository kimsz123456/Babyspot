package com.ssafy.babyspot.api.oauth.controller;

import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.babyspot.api.oauth.dto.KakaoAuthRequest;
import com.ssafy.babyspot.api.oauth.dto.KakaoAuthResponse;
import com.ssafy.babyspot.api.oauth.dto.RefreshTokenResponse;
import com.ssafy.babyspot.api.oauth.service.OAuth2UserInfoService;
import com.ssafy.babyspot.api.oauth.service.TokenService;
import com.ssafy.babyspot.domain.member.Member;
import com.ssafy.babyspot.domain.member.dto.SignUpToken;
import com.ssafy.babyspot.domain.member.service.MemberService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/auth")
public class OAuth2Controller {

	private final MemberService memberService;
	private final TokenService tokenService;
	private final OAuth2UserInfoService oAuth2UserInfoService;
	private final static Logger logger = LoggerFactory.getLogger(OAuth2Controller.class);

	public OAuth2Controller(MemberService memberService, TokenService tokenService,
		OAuth2UserInfoService oAuth2UserInfoService) {
		this.memberService = memberService;
		this.tokenService = tokenService;
		this.oAuth2UserInfoService = oAuth2UserInfoService;
	}

	@PostMapping("/refresh-token")
	public ResponseEntity<RefreshTokenResponse> refreshToken(
		@RequestHeader(value = "X-Refresh-Token", required = false) String refreshToken,
		HttpServletResponse response) {

		if (refreshToken == null || refreshToken.isEmpty()) {
			return ResponseEntity.badRequest()
				.body(new RefreshTokenResponse("refresh-token 이 없습니다.", null, null));
		}

		String registrationId = tokenService.getRegistrationId(refreshToken);
		if (registrationId == null) {
			return ResponseEntity.badRequest()
				.body(new RefreshTokenResponse("등록 ID가 없습니다.", null, null));
		}

		if (!tokenService.validateToken(refreshToken)) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
				.body(new RefreshTokenResponse("refresh-token 이 유효하지 않습니다", null, null));
		}

		int memberId = tokenService.getMemberId(refreshToken);
		Optional<Member> memberOpt = memberService.findById(memberId);

		if (memberOpt.isEmpty()) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
				.body(new RefreshTokenResponse("멤버를 찾을 수 없습니다.", null, null));
		}

		Member member = memberOpt.get();
		String newAccessToken = tokenService.createAccessToken(member.getId(), registrationId);
		String newRefreshToken = tokenService.createRefreshToken(member.getId(), registrationId);

		// 로그 확인용
		logger.info("New access token: " + newAccessToken);
		logger.info("New refresh token: " + newRefreshToken);

		// 모바일에서는 쿠키 대신 JSON 응답에 토큰 포함
		return ResponseEntity.ok(new RefreshTokenResponse("Token Refreshed", newAccessToken, newRefreshToken));
	}

	@PostMapping("/kakao")
	public ResponseEntity<KakaoAuthResponse> kakaoAuth(@RequestBody KakaoAuthRequest requestPayload) {
		String kakaoAccessToken = requestPayload.getKakaoAccessToken();
		if (kakaoAccessToken == null || kakaoAccessToken.isEmpty()) {
			return ResponseEntity.badRequest()
				.body(new KakaoAuthResponse(null, null, "kakaoAccessToken is required.", null));
		}

		// 1. 카카오 API를 통해 사용자 정보 조회
		Map<String, Object> userInfo = oAuth2UserInfoService.fetchProviderUserInfo("kakao", kakaoAccessToken);
		String providerId = oAuth2UserInfoService.extractProviderId("kakao", userInfo);
		logger.info("Extracted providerId: {}", providerId);

		// 2. DB에 해당 providerId로 회원 조회 (이미 가입된 경우)
		Optional<Member> existingMember = memberService.findByProviderId(providerId);
		SignUpToken signUpToken;
		if (existingMember.isPresent()) {
			Member member = existingMember.get();
			// 기존 회원 로그인 처리: JWT 발급
			String newAccessToken = tokenService.createAccessToken(member.getId(), "kakao");
			String newRefreshToken = tokenService.createRefreshToken(member.getId(), "kakao");
			// 기존 회원은 임시 토큰이 없음 (null)
			signUpToken = new SignUpToken(member, newAccessToken, newRefreshToken);
		} else {
			// 신규 회원인 경우, 추가 정보를 위한 임시 토큰 발급
			String tempToken = tokenService.createTempToken(providerId, "kakao");
			// 신규 회원은 아직 회원가입을 완료하지 않았으므로 액세스, 리프레시 토큰은 null
			signUpToken = new SignUpToken(tempToken, providerId);
		}

		KakaoAuthResponse responsePayload = new KakaoAuthResponse(
			signUpToken.getAccessToken(),
			signUpToken.getRefreshToken(),
			"Authentication successful",
			signUpToken.getTempToken()
		);
		return ResponseEntity.ok(responsePayload);
	}
}
