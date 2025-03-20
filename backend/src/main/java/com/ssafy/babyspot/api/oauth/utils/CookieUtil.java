package com.ssafy.babyspot.api.oauth.utils;

import jakarta.servlet.http.Cookie;

public class CookieUtil {

	public static Cookie createCookie(String name, String value, boolean httpOnly, boolean secure, String path,
		int maxAge, String sameSite) {
		Cookie cookie = new Cookie(name, value);
		cookie.setHttpOnly(httpOnly);
		cookie.setSecure(secure);
		cookie.setPath(path);
		cookie.setMaxAge(maxAge);
		cookie.setAttribute("sameSite", sameSite);
		return cookie;
	}

	public static Cookie deleteCookie(String name, boolean secure, String path, String sameSite) {
		return createCookie(name, null, true, secure, path, 0, sameSite);
	}

	public static Cookie createAccessCookie(String tokenValue, boolean secure) {
		return createCookie(
			"access-token",
			tokenValue,
			true,
			secure,
			"/",
			3600,
			"Strict"
		);
	}

	public static Cookie createRefreshCookie(String tokenValue, boolean secure) {
		return createCookie(
			"refresh-token",
			tokenValue,
			true,
			secure,
			"/",
			604800,
			"Strict"
		);
	}

	public static Cookie createTempCookie(String tokenValue, boolean secure) {
		return createCookie(
			"temp-token",
			tokenValue,
			true,
			secure,
			"/",
			300,
			"Strict"
		);
	}
}
