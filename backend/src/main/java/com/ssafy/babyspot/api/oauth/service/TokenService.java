package com.ssafy.babyspot.api.oauth.service;

import org.springframework.stereotype.Service;

import com.ssafy.babyspot.api.oauth.utils.JwtUtil;

@Service
public class TokenService {

	private final JwtUtil jwtUtil;

	public TokenService(final JwtUtil jwtUtil) {
		this.jwtUtil = jwtUtil;
	}

	public String createAccessToken(int memberId, String registrationId) {
		return jwtUtil.generateAccessToken(memberId, registrationId);
	}

	public String createRefreshToken(int memberId, String registrationId) {
		return jwtUtil.generateRefreshToken(memberId, registrationId);
	}

	public boolean validateToken(String token) {
		return jwtUtil.validateToken(token);
	}

	public String getRegistrationId(String token) {
		return jwtUtil.getRegistrationIdFromToken(token);
	}

	public int getMemberId(String token) {
		return jwtUtil.getMemberIdFromToken(token);
	}

	public String getProviderId(String token) {
		return jwtUtil.getProviderIdFromToken(token);
	}
}
