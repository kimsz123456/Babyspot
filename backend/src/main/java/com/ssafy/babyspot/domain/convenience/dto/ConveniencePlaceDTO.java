package com.ssafy.babyspot.domain.convenience.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ConveniencePlaceDTO {
	String title;
	String category;
	int distance;
	String link;
}
