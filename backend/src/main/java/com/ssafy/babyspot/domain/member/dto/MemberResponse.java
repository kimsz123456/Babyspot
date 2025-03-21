package com.ssafy.babyspot.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberResponse {
	private int id;
	private String nickname;
	private String profile_img;
	private String providerId;

}
