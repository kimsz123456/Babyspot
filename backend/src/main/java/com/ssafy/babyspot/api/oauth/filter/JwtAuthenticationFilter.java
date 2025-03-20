package com.ssafy.babyspot.api.oauth.filter;

import java.io.IOException;
import java.util.Collection;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import com.ssafy.babyspot.api.oauth.service.TokenService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

	private final TokenService tokenService;

	public JwtAuthenticationFilter(TokenService tokenService) {
		this.tokenService = tokenService;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
		FilterChain filterChain) throws ServletException, IOException {

		String token = getJwtFromCookies(request);

		if (token != null && tokenService.validateToken(token)) {

			int MemberId = tokenService.getMemberId(token);

			UserDetails userDetails = new UserDetails() {
				@Override
				public Collection<? extends GrantedAuthority> getAuthorities() {
					return List.of();
				}

				@Override
				public String getPassword() {
					return "";
				}

				@Override
				public String getUsername() {
					return String.valueOf(MemberId);
				}
			};

			UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails,
				null,
				userDetails.getAuthorities());
			authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
			SecurityContextHolder.getContext().setAuthentication(authentication);
		}
		filterChain.doFilter(request, response);
	}

	private String getJwtFromCookies(HttpServletRequest request) {
		if (request.getCookies() == null) {
			return null;
		}
		for (Cookie cookie : request.getCookies()) {
			if ("access-token".equals(cookie.getName())) {
				return cookie.getValue();
			}
		}
		return null;
	}
}
