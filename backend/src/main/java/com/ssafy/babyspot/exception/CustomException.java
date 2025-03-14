package com.ssafy.babyspot.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public class CustomException extends RuntimeException {
	private final ErrorCode errorCode;
	private final HttpStatus status;

	public CustomException(ErrorCode errorCode) {
		super(errorCode.getMessage());
		this.errorCode = errorCode;
		this.status = errorCode.getStatus();
	}

	public CustomException(HttpStatus status, String message) {
		super(message);
		this.errorCode = null;
		this.status = status;
	}

	public boolean hasErrorCode() {
		return this.errorCode != null;
	}
}
