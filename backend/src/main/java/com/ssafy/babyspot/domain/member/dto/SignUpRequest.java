package com.ssafy.babyspot.domain.member.dto;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SignUpRequest {

	@NotBlank(message = "닉네임은 필수 입력 항목입니다.")
	private String nickname;

	private String profileImgUrl;

	private List<Integer> birthYears;
}
