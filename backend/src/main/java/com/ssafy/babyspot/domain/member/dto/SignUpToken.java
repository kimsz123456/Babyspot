package com.ssafy.babyspot.domain.member.dto;

import com.ssafy.babyspot.domain.member.Member;

import lombok.Getter;

@Getter
public class SignUpToken {
	private Member member;
	private String accessToken;
	private String refreshToken;
	private String tempToken;

	public SignUpToken(Member member, String accessToken, String refreshToken) {
		this.member = member;
		this.accessToken = accessToken;
		this.refreshToken = refreshToken;
	}

	public SignUpToken(String tempToken, String providerId) {
		this.tempToken = tempToken;
	}

}

