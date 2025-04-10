package com.ssafy.babyspot.domain.search.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SearchHistoryDto {
	private int id;
	private String searchTerm;
	private LocalDateTime createAt;
}
