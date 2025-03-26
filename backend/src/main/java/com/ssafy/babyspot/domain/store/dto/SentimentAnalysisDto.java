package com.ssafy.babyspot.domain.store.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SentimentAnalysisDto {
	private List<String> positive;
	private List<String> negative;
}
