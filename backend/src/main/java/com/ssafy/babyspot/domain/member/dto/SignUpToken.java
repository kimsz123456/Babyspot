package com.ssafy.babyspot.domain.member.dto;

import com.ssafy.babyspot.domain.member.Member;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SignUpToken {
	private Member member;
	private String accessToken;
	private String refreshToken;
}
