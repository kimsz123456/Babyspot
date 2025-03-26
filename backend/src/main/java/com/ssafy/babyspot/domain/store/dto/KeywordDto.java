package com.ssafy.babyspot.domain.store.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class KeywordDto {
	private String keyword;
	private List<String> reviews;
}
