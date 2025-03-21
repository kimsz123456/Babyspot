package com.ssafy.babyspot.api.oauth.controller;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.babyspot.api.oauth.dto.RefreshTokenResponse;
import com.ssafy.babyspot.api.oauth.service.TokenService;
import com.ssafy.babyspot.api.oauth.utils.CookieUtil;
import com.ssafy.babyspot.domain.member.Member;
import com.ssafy.babyspot.domain.member.service.MemberService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/auth")
public class OAuth2Controller {

	private final MemberService memberService;
	private final TokenService tokenService;
	private final static Logger logger = LoggerFactory.getLogger(OAuth2Controller.class);

	public OAuth2Controller(MemberService memberService, TokenService tokenService) {
		this.memberService = memberService;
		this.tokenService = tokenService;
	}

	@PostMapping("/refresh-token")
	public ResponseEntity<RefreshTokenResponse> refreshToken(@CookieValue(name = "refresh-token") String refreshToken,
		HttpServletResponse response, Authentication authentication) {
		String registrationId = tokenService.getRegistrationId(refreshToken);
		if (registrationId == null || refreshToken.isEmpty()) {
			return ResponseEntity.badRequest().body(new RefreshTokenResponse("refresh-token 이 없습니다.", null, null));
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

		logger.info("New access token: " + newAccessToken);
		logger.info("New refresh token: " + newRefreshToken);

		Cookie accessCookie = CookieUtil.createAccessCookie(newAccessToken, false);
		response.addCookie(accessCookie);

		Cookie refreshCookie = CookieUtil.createRefreshCookie(newRefreshToken, false);
		response.addCookie(refreshCookie);

		return ResponseEntity.ok(new RefreshTokenResponse("Token Refreshed", newAccessToken, newRefreshToken));
	}
}
