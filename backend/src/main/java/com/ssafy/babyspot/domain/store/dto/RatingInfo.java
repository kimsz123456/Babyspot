package com.ssafy.babyspot.domain.store.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class RatingInfo {
	private float avgRating;
	private int reviewCount;
}
