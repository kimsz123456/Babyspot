package com.ssafy.babyspot.domain.store.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SentimentAnalysisDto {
	private String positiveSummary;
	private List<String> positive;
	private String negativeSummary;
	private List<String> negative;
}

