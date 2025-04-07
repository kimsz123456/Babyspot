package com.ssafy.babyspot.domain.reveiw.dto;

import java.util.List;

import lombok.Data;

@Data
public class ReviewRequestDto {
	private int memberId;
	private int storeId;
	private float rating;
	private String content;
	private List<Integer> babyAges;
	private List<String> imgNames;
	private List<String> contentTypes;
}
