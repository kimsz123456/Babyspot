package com.ssafy.babyspot.domain.member.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.babyspot.exception.CustomException;
import com.ssafy.babyspot.exception.ErrorCode;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;

@RestController
public class MemberController {

	@Operation(summary = "Hello API", description = "이 API는 Hello 메시지를 반환합니다.")
	@GetMapping("/hello")
	public String hello(
		@Parameter(description = "사용자 이름", example = "John")
		@RequestParam String name
	) {
		if ("unknown".equalsIgnoreCase(name)) {
			throw new CustomException(ErrorCode.INVALID_REQUEST);
		}

		if (name.length() < 3) {
			throw new CustomException(HttpStatus.BAD_REQUEST, "이름은 최소 3자 이상이어야 합니다.");
		}

		return "Hello, " + name;
	}
}
