package com.ssafy.babyspot.domain.reveiw.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ReviewImagePreSignedUrlDto {
	private List<ImageInfo> images;
}