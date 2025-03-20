package com.ssafy.babyspot.api.oauth.service;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.ssafy.babyspot.exception.CustomException;
import com.ssafy.babyspot.exception.ErrorCode;

@Component
public class OAuth2UserInfoService {

	private static final Logger logger = LoggerFactory.getLogger(OAuth2UserInfoService.class);

	public Map<String, Object> fetchProviderUserInfo(String registrationId, String accessToken) {
		if ("kakao".equalsIgnoreCase(registrationId)) {
			return fetchKakaoUserInfo(accessToken);
		} else {
			throw new CustomException(ErrorCode.INVALID_REQUEST);
		}
	}

	private Map<String, Object> fetchKakaoUserInfo(String accessToken) {
		RestTemplate restTemplate = new RestTemplate();
		HttpHeaders headers = new HttpHeaders();
		headers.add("Authorization", "Bearer " + accessToken);
		HttpEntity<String> entity = new HttpEntity<>(headers);

		ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
			"https://kapi.kakao.com/v2/user/me",
			HttpMethod.GET,
			entity,
			new ParameterizedTypeReference<Map<String, Object>>() {
			}
		);

		if (!response.getStatusCode().is2xxSuccessful()) {
			throw new CustomException(ErrorCode.INVALID_REQUEST);
		}

		Map<String, Object> userInfo = response.getBody();
		logger.info("Kakao API 응답: {}", userInfo);
		return userInfo;
	}

	public String extractProviderId(String registrationId, Map<String, Object> providerUserInfo) {
		if ("kakao".equalsIgnoreCase(registrationId)) {
			Object providerId = providerUserInfo.get("id");
			if (providerId == null) {
				throw new CustomException(ErrorCode.INVALID_REQUEST);
			}
			return providerId.toString();
		} else {
			throw new CustomException(ErrorCode.INVALID_REQUEST);
		}
	}
}
