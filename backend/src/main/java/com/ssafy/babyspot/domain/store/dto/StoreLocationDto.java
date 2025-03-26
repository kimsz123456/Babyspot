package com.ssafy.babyspot.domain.store.dto;

import lombok.Data;

@Data
public class StoreLocationDto {
	private int storeId;
	private String title;
	private Double latitude;
	private Double longitude;

	public StoreLocationDto(int storeId, String title, Double latitude, Double longitude) {
		this.storeId = storeId;
		this.title = title;
		this.latitude = latitude;
		this.longitude = longitude;
	}
}
