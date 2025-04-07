package com.ssafy.babyspot.api.oauth.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class KakaoAuthRequest {
	private String kakaoAccessToken;
}
