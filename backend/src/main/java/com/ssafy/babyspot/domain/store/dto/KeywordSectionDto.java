package com.ssafy.babyspot.domain.store.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class KeywordSectionDto {
	private List<KeywordDto> keywords;
	private int totalCount;
}