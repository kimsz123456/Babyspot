package com.ssafy.babyspot.api.oauth.service;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.ssafy.babyspot.api.oauth.utils.CookieUtil;
import com.ssafy.babyspot.api.oauth.utils.JwtUtil;
import com.ssafy.babyspot.domain.member.Member;
import com.ssafy.babyspot.domain.member.service.MemberService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class MemberAuthenticationService {

	private static final Logger logger = LoggerFactory.getLogger(MemberAuthenticationService.class);
	private final MemberService memberService;
	private final TokenService tokenService;
	private final JwtUtil jwtUtil;

	public MemberAuthenticationService(MemberService memberService, TokenService tokenService, JwtUtil jwtUtil) {
		this.memberService = memberService;
		this.tokenService = tokenService;
		this.jwtUtil = jwtUtil;
	}

	public void processMemberLogin(String providerId, String registrationId, HttpServletResponse response,
		String baseUrl) throws IOException {
		Member member = memberService.findByProviderId(providerId).orElse(null);
		if (member != null) {
			// 기존 회원 로그인 처리: member 객체를 넘겨 토큰 생성
			String jwtAccessToken = tokenService.createAccessToken(member.getId(), registrationId);
			String jwtRefreshToken = tokenService.createRefreshToken(member.getId(), registrationId);
			Cookie accessCookie = CookieUtil.createAccessCookie(jwtAccessToken, false);
			response.addCookie(accessCookie);
			if (jwtRefreshToken != null) {
				Cookie refreshCookie = CookieUtil.createRefreshCookie(jwtRefreshToken, false);
				response.addCookie(refreshCookie);
			}
			response.sendRedirect(baseUrl);
		} else {
			// 신규 회원 처리
			String tempToken = jwtUtil.generateTempToken(providerId, registrationId);

			logger.info("TempToken: {}", tempToken);

			Cookie tempCookie = CookieUtil.createTempCookie(tempToken, false);
			response.addCookie(tempCookie);
			response.sendRedirect(baseUrl + "/sign-up");
		}
	}

}

