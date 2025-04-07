package com.ssafy.babyspot.api.oauth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
public class KakaoAuthResponse {

	private String access_token;
	private String refresh_token;
	private String message;
	private String temp_token;
}
