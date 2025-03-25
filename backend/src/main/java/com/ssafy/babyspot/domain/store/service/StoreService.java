package com.ssafy.babyspot.domain.store.service;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.ssafy.babyspot.domain.store.KeywordReview;
import com.ssafy.babyspot.domain.store.SentimentAnalysis;
import com.ssafy.babyspot.domain.store.Store;
import com.ssafy.babyspot.domain.store.StoreImage;
import com.ssafy.babyspot.domain.store.StoreKeyword;
import com.ssafy.babyspot.domain.store.StoreMenu;
import com.ssafy.babyspot.domain.store.dto.KeywordDto;
import com.ssafy.babyspot.domain.store.dto.SentimentAnalysisDto;
import com.ssafy.babyspot.domain.store.dto.StoreDefaultInfoDto;
import com.ssafy.babyspot.domain.store.dto.StoreDetailDto;
import com.ssafy.babyspot.domain.store.dto.StoreImageDto;
import com.ssafy.babyspot.domain.store.dto.StoreLocationDto;
import com.ssafy.babyspot.domain.store.dto.StoreMenuDto;
import com.ssafy.babyspot.domain.store.repository.KeywordReviewRepository;
import com.ssafy.babyspot.domain.store.repository.SentimentAnalysisRepository;
import com.ssafy.babyspot.domain.store.repository.StoreImageRepository;
import com.ssafy.babyspot.domain.store.repository.StoreKeywordRepository;
import com.ssafy.babyspot.domain.store.repository.StoreMenuRepository;
import com.ssafy.babyspot.domain.store.repository.StoreRepository;
import com.ssafy.babyspot.exception.CustomException;

import jakarta.transaction.Transactional;

@Service
public class StoreService {

	private final StoreRepository storeRepository;
	private final StoreImageRepository storeImageRepository;
	private final StoreMenuRepository storeMenuRepository;
	private final StoreKeywordRepository storeKeywordRepository;
	private final KeywordReviewRepository keywordReviewRepository;
	private final SentimentAnalysisRepository sentimentAnalysisRepository;

	public StoreService(StoreRepository storeRepository, StoreImageRepository storeImageRepository,
		StoreMenuRepository storeMenuRepository, StoreKeywordRepository storeKeywordRepository,
		KeywordReviewRepository keywordReviewRepository, SentimentAnalysisRepository sentimentAnalysisRepository) {
		this.storeRepository = storeRepository;
		this.storeImageRepository = storeImageRepository;
		this.storeMenuRepository = storeMenuRepository;
		this.storeKeywordRepository = storeKeywordRepository;
		this.keywordReviewRepository = keywordReviewRepository;
		this.sentimentAnalysisRepository = sentimentAnalysisRepository;
	}

	@Transactional
	public List<StoreLocationDto> getStoresInRange(Double topLeftLat, Double topLeftLong,
		Double bottomRightLat, Double bottomRightLong) {

		// topLeft와 bottomRight 좌표를 받아 최소/최대 위도와 경도
		double minLat = Math.min(topLeftLat, bottomRightLat);
		double maxLat = Math.max(topLeftLat, bottomRightLat);
		double minLong = Math.min(topLeftLong, bottomRightLong);
		double maxLong = Math.max(topLeftLong, bottomRightLong);

		List<Store> stores = storeRepository.findStoresInRange(minLong, minLat, maxLong, maxLat);

		return stores.stream()
			.map(store -> new StoreLocationDto(
				store.getId(),
				store.getTitle(),
				store.getLocation().getY(),
				store.getLocation().getX()
			))
			.collect(Collectors.toList());
	}

	@Transactional
	public StoreDefaultInfoDto getStoreDefaultInfo(int storeId) {
		return storeRepository.findById(storeId)
			.map(store -> {
				StoreDefaultInfoDto storeDefaultInfoDto = new StoreDefaultInfoDto();
				storeDefaultInfoDto.setId(store.getId());
				storeDefaultInfoDto.setTitle(store.getTitle());
				storeDefaultInfoDto.setAddress(store.getAddress());
				storeDefaultInfoDto.setContactNumber(store.getContactNumber());
				storeDefaultInfoDto.setTransportationConvenience(store.getTransportationConvenience());
				storeDefaultInfoDto.setBusinessHour(store.getBusinessHour());
				storeDefaultInfoDto.setRating(store.getRating());
				storeDefaultInfoDto.setReviewCount(store.getReviewCount());
				storeDefaultInfoDto.setBabyChair(store.getBabyChair());
				storeDefaultInfoDto.setBabyTableware(store.getBabyTableware());
				storeDefaultInfoDto.setStrollerAccess(store.getStrollerAccess());
				storeDefaultInfoDto.setDiaperChangingStation(store.getDiaperChangingStation());
				storeDefaultInfoDto.setNursingRoom(store.getNursingRoom());
				storeDefaultInfoDto.setKidsMenu(store.getKidsMenu());
				storeDefaultInfoDto.setPlayZone(store.getPlayZone());
				storeDefaultInfoDto.setGroupTable(store.getGroupTable());
				return storeDefaultInfoDto;
			})
			.orElseThrow(() -> new RuntimeException("매장이 없습니다."));
	}

	@Transactional
	public List<StoreImageDto> getStoreImages(int storeId) {
		List<StoreImage> images = storeImageRepository.findAllByStore_Id(storeId);

		return images.stream()
			.map(image -> new StoreImageDto(image.getStoreImg()))
			.collect(Collectors.toList());
	}

	@Transactional
	public List<StoreMenuDto> getStoreMenus(int storeId) {
		List<StoreMenu> menus = storeMenuRepository.findAllByStore_Id(storeId);

		return menus.stream()
			.map(menu -> new StoreMenuDto(menu.getName(), menu.getPrice(), menu.getImage()))
			.collect(Collectors.toList());
	}

	@Transactional
	public List<KeywordDto> getKeywordsAndReviews(int storeId) {
		List<StoreKeyword> keywords = storeKeywordRepository.findAllByStore_Id(storeId);
		List<KeywordReview> allReviews = keywordReviewRepository.findAllByStoreKeyword_Store_Id(storeId);

		Map<Integer, List<String>> reviewsMap = allReviews.stream()
			.collect(Collectors.groupingBy(
				r -> r.getStoreKeyword().getId(),
				Collectors.flatMapping(r -> r.getReview().stream(), Collectors.toList())
			));

		return keywords.stream()
			.map(k -> new KeywordDto(
				k.getKeyword(),
				reviewsMap.getOrDefault(k.getId(), Collections.emptyList())
			))
			.collect(Collectors.toList());
	}

	@Transactional
	public SentimentAnalysisDto getSentimentAnalysis(int storeId) {

		List<SentimentAnalysis> sentiments = sentimentAnalysisRepository.findAllByStore_Id(storeId);

		List<String> allPositive = sentiments.stream()
			.flatMap(s -> s.getPositive().stream())
			.toList();

		List<String> allNegative = sentiments.stream()
			.flatMap(s -> s.getNegative().stream())
			.toList();

		return new SentimentAnalysisDto(allPositive, allNegative);
	}

	@Transactional
	public StoreDetailDto getStoreDetail(int storeId) {

		Store store = storeRepository.findById(storeId)
			.orElseThrow(() -> new CustomException(HttpStatus.NOT_FOUND, "존재하지않는 매장입니다."));

		List<StoreImageDto> storeImages = getStoreImages(storeId);
		List<StoreMenuDto> storeMenus = getStoreMenus(storeId);
		List<KeywordDto> keywords = getKeywordsAndReviews(storeId);
		SentimentAnalysisDto sentiment = getSentimentAnalysis(storeId);

		return StoreDetailDto.builder()
			.storeId(store.getId())
			.storeName(store.getTitle())
			.images(storeImages)
			.menus(storeMenus)
			.keywordsAndReviews(keywords)
			.sentiment(sentiment)
			.build();
	}
}