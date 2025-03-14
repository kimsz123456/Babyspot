package com.ssafy.babyspot.exception;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public class ErrorResponse {
	private final LocalDateTime timestamp;
	private final int status;
	private final String error;

	public ErrorResponse(ErrorCode errorCode) {
		this.timestamp = LocalDateTime.now();
		this.status = errorCode.getStatus().value();
		this.error = errorCode.getMessage();
	}

	public ErrorResponse(HttpStatus status, String message) {
		this.timestamp = LocalDateTime.now();
		this.status = status.value();
		this.error = message;
	}
}
