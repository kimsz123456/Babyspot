package com.ssafy.babyspot.domain.reveiw.dto;

import java.util.List;
import java.util.Map;

import lombok.Data;

@Data
public class UpdateReviewResponseDto {
	private int reviewId;
	private List<Map<String, String>> preSignedUrls;
}