package com.ssafy.babyspot.util;

import java.util.Arrays;

import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/utils")
public class UtilController {

	private final Environment env;

	@GetMapping("/status")
	public String getProfile() {
		return "check";
	}
}