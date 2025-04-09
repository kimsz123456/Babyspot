package com.ssafy.babyspot.domain.reveiw.dto;

import java.time.LocalDateTime;
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
	private LocalDateTime createdAt;
	private List<String> imgUrls;
	private int likeCount;
	private String profile;
	private int reviewCount;
	private String storeName;
	private Boolean okZone;
	private String category;
}
