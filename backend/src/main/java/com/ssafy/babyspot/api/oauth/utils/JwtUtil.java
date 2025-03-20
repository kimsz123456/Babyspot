package com.ssafy.babyspot.api.oauth.utils;

import java.security.Key;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import com.ssafy.babyspot.exception.CustomException;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {
	private static final Logger logger = LoggerFactory.getLogger(JwtUtil.class);
	private final Key key;
	private final long ACCESS_TOKEN_EXPIRATION;
	private final long REFRESH_TOKEN_EXPIRATION;
	private final long TEMP_TOKEN_EXPIRATION;

	public JwtUtil(
		@Value("${JWT_SECRET}") String secret,
		@Value("${ACCESS_TOKEN_EXPIRATION}") long accessTokenExpiration,
		@Value("${REFRESH_TOKEN_EXPIRATION}") long refreshTokenExpiration,
		@Value("${TEMP_TOKEN_EXPIRATION}") long tempTokenExpiration) {
		if (secret == null || secret.length() < 32) {
			throw new CustomException(HttpStatus.BAD_REQUEST,
				"JWT secret is invalid. It must be at least 32 characters.");
		}
		logger.info("JWT SECRET length: {}", secret.length());
		this.key = Keys.hmacShaKeyFor(secret.getBytes());
		this.ACCESS_TOKEN_EXPIRATION = accessTokenExpiration;
		this.REFRESH_TOKEN_EXPIRATION = refreshTokenExpiration;
		this.TEMP_TOKEN_EXPIRATION = tempTokenExpiration;

	}

	private String generateToken(long expirationMillis, String registrationId, int memberId) {
		long now = System.currentTimeMillis();
		return Jwts.builder()
			.setSubject(String.valueOf(memberId))
			.claim("registrationId", registrationId)
			.setIssuedAt(new Date(now))
			.setExpiration(new Date(now + expirationMillis))
			.signWith(key, SignatureAlgorithm.HS256)
			.compact();
	}

	private String generateTempToken(long expirationMillis, String registrationId, String providerId) {
		long now = System.currentTimeMillis();
		return Jwts.builder()
			.setSubject(providerId)
			.claim("registrationId", registrationId)
			.setIssuedAt(new Date(now))
			.setExpiration(new Date(now + expirationMillis))
			.signWith(key, SignatureAlgorithm.HS256)
			.compact();
	}

	public String generateAccessToken(int memberId, String registrationId) {
		return generateToken(ACCESS_TOKEN_EXPIRATION, registrationId, memberId);
	}

	public String generateRefreshToken(int memberId, String registrationId) {
		return generateToken(REFRESH_TOKEN_EXPIRATION, registrationId, memberId);
	}

	public String generateTempToken(String providerId, String registrationId) {
		return generateTempToken(TEMP_TOKEN_EXPIRATION, registrationId, providerId);
	}

	public Claims parseToken(String token) {
		try {
			return Jwts.parserBuilder()
				.setSigningKey(key)
				.build()
				.parseClaimsJws(token)
				.getBody();
		} catch (JwtException | IllegalArgumentException e) {
			logger.error("JWT token validation failed", e);
			throw new CustomException(HttpStatus.UNAUTHORIZED, "Invalid JWT token");
		}
	}

	public int getMemberIdFromToken(String token) {
		Claims claims = parseToken(token);
		return Integer.parseInt(claims.getSubject());
	}

	public String getProviderIdFromToken(String token) {
		Claims claims = parseToken(token);
		return claims.getSubject();
	}

	public String getRegistrationIdFromToken(String token) {
		Claims claims = parseToken(token);
		return claims.get("registrationId", String.class);
	}

	public Boolean validateToken(String token) {
		try {
			parseToken(token);
			return true;
		} catch (JwtException | IllegalArgumentException | CustomException e) {
			logger.error("JWT token validation failed", e);
			return false;
		}
	}
}
