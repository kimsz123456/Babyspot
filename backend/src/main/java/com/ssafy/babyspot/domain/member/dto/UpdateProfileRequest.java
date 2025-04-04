package com.ssafy.babyspot.domain.member.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateProfileRequest {
	private String nickname;
	private String profileImgUrl;
	private String contentType;
	private List<Integer> babyAges;
}