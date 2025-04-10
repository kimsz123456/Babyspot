package com.ssafy.babyspot.domain.store.dto;

import java.util.List;

import com.ssafy.babyspot.domain.convenience.dto.ConveniencePlaceDTO;
import com.ssafy.babyspot.domain.reveiw.dto.ReviewResponseDto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StoreDetailDto {

	private int storeId;

	private String storeName;

	private List<StoreImageDto> images;

	private List<StoreMenuDto> menus;

	private KeywordSectionDto keywordSection;

	private SentimentAnalysisDto sentiment;

	private List<KidsMenuDto> kidsMenu;

	private List<ReviewResponseDto> latestReviews;

	private List<Integer> babyAges;

	private Float rating;

	private int reviewCount;

	private List<ConveniencePlaceDTO> conveniencePlace;

	private StoreDefaultInfoDto defaultInfo;
}
