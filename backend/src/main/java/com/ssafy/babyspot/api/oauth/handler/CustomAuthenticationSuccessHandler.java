package com.ssafy.babyspot.api.oauth.handler;

import java.io.IOException;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.ssafy.babyspot.api.oauth.service.MemberAuthenticationService;
import com.ssafy.babyspot.api.oauth.service.OAuth2UserInfoService;
import com.ssafy.babyspot.exception.CustomException;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

	private final OAuth2AuthorizedClientService authorizedClientService;
	private final OAuth2UserInfoService oauth2UserInfoService;
	private final MemberAuthenticationService memberAuthService;
	private static final Logger logger = LoggerFactory.getLogger(CustomAuthenticationSuccessHandler.class);

	@Value("${BASE_URL}")
	private String baseUrl;

	public CustomAuthenticationSuccessHandler(OAuth2AuthorizedClientService authorizedClientService,
		OAuth2UserInfoService oauth2UserInfoService,
		MemberAuthenticationService memberAuthService) {
		this.authorizedClientService = authorizedClientService;
		this.oauth2UserInfoService = oauth2UserInfoService;
		this.memberAuthService = memberAuthService;
	}

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) throws IOException, ServletException {

		OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken)authentication;
		String registrationId = oauthToken.getAuthorizedClientRegistrationId();
		String username = oauthToken.getName();

		OAuth2AuthorizedClient client = authorizedClientService.loadAuthorizedClient(registrationId, username);
		if (client == null) {
			throw new CustomException(HttpStatus.BAD_REQUEST, "Client not found");
		}

		String oauthAccessToken = client.getAccessToken().getTokenValue();
		Map<String, Object> providerUserInfo = oauth2UserInfoService.fetchProviderUserInfo(registrationId,
			oauthAccessToken);
		String providerId = oauth2UserInfoService.extractProviderId(registrationId, providerUserInfo);

		memberAuthService.processMemberLogin(providerId, registrationId, response, baseUrl);
	}
}
