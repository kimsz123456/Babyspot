package com.ssafy.babyspot.domain.reveiw.dto;

import java.util.List;

import lombok.Data;

@Data
public class UpdateRequestDto {
	private Float rating;
	private String content;
	private List<String> existingImageKeys;
	private List<ImageUpdateDto> newImages;
}
