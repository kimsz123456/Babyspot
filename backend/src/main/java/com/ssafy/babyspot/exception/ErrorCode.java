package com.ssafy.babyspot.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public enum ErrorCode {

	INVALID_REQUEST(HttpStatus.BAD_REQUEST, "잘못된 요청입니다."),
	INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "처리되지 않은 에러입니다. 문의해주세요."),

	UNAUTHORIZED_ACCESS(HttpStatus.UNAUTHORIZED, "로그인이 필요합니다."),
	FORBIDDEN_ACCESS(HttpStatus.FORBIDDEN, "접근 권한이 없습니다.");

	private final HttpStatus status;
	private final String message;

	ErrorCode(HttpStatus status, String message) {
		this.status = status;
		this.message = message;
	}
}
