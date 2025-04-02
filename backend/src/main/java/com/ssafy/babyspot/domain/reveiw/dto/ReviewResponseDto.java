package com.ssafy.babyspot.domain.reveiw.dto;

import java.time.LocalDate;
import java.util.List;

import lombok.Data;

@Data
public class ReviewResponseDto {
	private int reviewId;
	private int memberId;
	private String memberNickname;
	private List<Integer> babyAges;
	private int storeId;
	private float rating;
	private String content;
	private LocalDate createdAt;
	private List<String> imgUrls;
	private int likeCount;
}
