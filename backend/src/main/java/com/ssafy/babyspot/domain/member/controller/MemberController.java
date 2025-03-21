package com.ssafy.babyspot.domain.member.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.babyspot.api.oauth.service.TokenService;
import com.ssafy.babyspot.api.oauth.utils.CookieUtil;
import com.ssafy.babyspot.domain.member.Member;
import com.ssafy.babyspot.domain.member.dto.MemberResponse;
import com.ssafy.babyspot.domain.member.dto.SignUpRequest;
import com.ssafy.babyspot.domain.member.dto.SignUpResponse;
import com.ssafy.babyspot.domain.member.dto.SignUpToken;
import com.ssafy.babyspot.domain.member.service.MemberService;
import com.ssafy.babyspot.exception.CustomException;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/members")
public class MemberController {

	private final MemberService memberService;
	private final TokenService tokenService;

	public MemberController(MemberService memberService, TokenService tokenService) {
		this.memberService = memberService;
		this.tokenService = tokenService;
	}

	@GetMapping("/me")
	public ResponseEntity<MemberResponse> getCurrentMember(Authentication authentication) {
		if (authentication == null || !authentication.isAuthenticated()) {
			throw new CustomException(HttpStatus.UNAUTHORIZED, "로그인이 필요합니다.");
		}

		String memberId = authentication.getName();
		Member member = memberService.findById(Integer.parseInt(memberId))
			.orElseThrow(() -> new CustomException(HttpStatus.NOT_FOUND, "회원 정보를 찾을 수 없습니다."));

		MemberResponse memberResponse = new MemberResponse(member.getId(), member.getNickname(), member.getProfileImg(),
			member.getProviderId());
		return ResponseEntity.ok(memberResponse);
	}

	@PostMapping("/signup")
	public ResponseEntity<SignUpResponse> signUp(@RequestBody @Valid SignUpRequest signUpRequest,
		HttpServletRequest request, HttpServletResponse response, Authentication authentication) {

		String providerId = extractAndValidateTempToken(request);

		String registrationId = null;
		if (authentication instanceof OAuth2AuthenticationToken oauthToken) {
			registrationId = oauthToken.getAuthorizedClientRegistrationId();
		} else if (authentication instanceof UsernamePasswordAuthenticationToken) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new SignUpResponse("OAuth2 인증 필요", null, null));
		}

		if (providerId == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
				.body(new SignUpResponse("유요한 인증정보가 없습니다. 다시 로그인해주세요.", null, null));
		}

		try {
			SignUpToken result = memberService.signUpToken(providerId, signUpRequest, registrationId);

			Cookie accessCookie = CookieUtil.createAccessCookie(result.getAccessToken(), true);
			response.addCookie(accessCookie);

			if (result.getRefreshToken() != null) {
				Cookie refreshCookie = CookieUtil.createRefreshCookie(result.getRefreshToken(), true);
				response.addCookie(refreshCookie);
			}

			Cookie tempCookie = CookieUtil.deleteCookie("temp-token", false, "/", "Strict");
			response.addCookie(tempCookie);

			return ResponseEntity.ok(
				new SignUpResponse("회원가입 완료", result.getAccessToken(), result.getRefreshToken()));
		} catch (IllegalArgumentException e) {
			return ResponseEntity.badRequest().body(new SignUpResponse(e.getMessage(), null, null));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body(new SignUpResponse("회원가입 실패", null, null));
		}

	}

	private String extractAndValidateTempToken(HttpServletRequest request) {
		if (request.getCookies() != null) {
			for (Cookie cookie : request.getCookies()) {
				if (cookie.getName().equals("temp-token")) {
					String tempToken = cookie.getValue();
					if (tokenService.validateToken(tempToken)) {
						return tokenService.getProviderId(tempToken);
					}
				}
			}
		}
		return null;
	}
}
