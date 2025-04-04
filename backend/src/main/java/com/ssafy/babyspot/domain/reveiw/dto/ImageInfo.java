package com.ssafy.babyspot.domain.reveiw.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ImageInfo {
	private String preSignedUrl;
	private String reviewImgKey;
	private String contentType;
	private String imageName;
	private Integer orderIndex;
}
