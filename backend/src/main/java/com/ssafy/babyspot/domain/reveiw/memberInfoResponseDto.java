package com.ssafy.babyspot.domain.reveiw;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class memberInfoResponseDto {
	private int memberId;
	private String nickname;
	private List<Integer> babyAges;

}
