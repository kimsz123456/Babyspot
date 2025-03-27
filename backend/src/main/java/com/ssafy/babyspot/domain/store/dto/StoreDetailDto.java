package com.ssafy.babyspot.domain.store.dto;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StoreDetailDto {

	private int storeId;
	private String storeName;

	private List<StoreImageDto> images;

	private List<StoreMenuDto> menus;

	private List<KeywordDto> keywordsAndReviews;

	private SentimentAnalysisDto sentiment;

	private List<KidsMenuDto> kidsMenu;

}
