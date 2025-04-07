package com.ssafy.babyspot.domain.store.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StoreMenuDto {
	private String name;
	private int price;
	private String image;
}
