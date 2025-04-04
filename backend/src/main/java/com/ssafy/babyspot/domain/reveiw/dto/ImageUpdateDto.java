package com.ssafy.babyspot.domain.reveiw.dto;

import lombok.Data;

@Data
public class ImageUpdateDto {
	private String contentType;
	private String imageName;
	private Integer orderIndex;
}
