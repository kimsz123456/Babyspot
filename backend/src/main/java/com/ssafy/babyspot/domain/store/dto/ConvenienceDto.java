package com.ssafy.babyspot.domain.store.dto;

import java.util.HashMap;
import java.util.Map;

import lombok.Data;

@Data
public class ConvenienceDto {
	private Map<String, Boolean> convenienceDetails = new HashMap<>();
}