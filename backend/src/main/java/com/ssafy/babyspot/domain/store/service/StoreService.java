package com.ssafy.babyspot.domain.store.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.babyspot.api.s3.S3Component;
import com.ssafy.babyspot.domain.convenience.dto.ConveniencePlaceDTO;
import com.ssafy.babyspot.domain.convenience.service.ConvenienceService;
import com.ssafy.babyspot.domain.member.repository.MemberRepository;
import com.ssafy.babyspot.domain.reveiw.Review;
import com.ssafy.babyspot.domain.reveiw.dto.ReviewResponseDto;
import com.ssafy.babyspot.domain.reveiw.repository.ReviewRepository;
import com.ssafy.babyspot.domain.store.KeywordReview;
import com.ssafy.babyspot.domain.store.SentimentAnalysis;
import com.ssafy.babyspot.domain.store.Store;
import com.ssafy.babyspot.domain.store.StoreImage;
import com.ssafy.babyspot.domain.store.StoreKeyword;
import com.ssafy.babyspot.domain.store.StoreMenu;
import com.ssafy.babyspot.domain.store.dto.ConvenienceDto;
import com.ssafy.babyspot.domain.store.dto.KeywordDto;
import com.ssafy.babyspot.domain.store.dto.KeywordReviewDto;
import com.ssafy.babyspot.domain.store.dto.KeywordSectionDto;
import com.ssafy.babyspot.domain.store.dto.KidsMenuDto;
import com.ssafy.babyspot.domain.store.dto.RatingInfo;
import com.ssafy.babyspot.domain.store.dto.SentimentAnalysisDto;
import com.ssafy.babyspot.domain.store.dto.StoreDefaultInfoDto;
import com.ssafy.babyspot.domain.store.dto.StoreDetailDto;
import com.ssafy.babyspot.domain.store.dto.StoreImageDto;
import com.ssafy.babyspot.domain.store.dto.StoreMenuDto;
import com.ssafy.babyspot.domain.store.repository.KeywordReviewRepository;
import com.ssafy.babyspot.domain.store.repository.SentimentAnalysisRepository;
import com.ssafy.babyspot.domain.store.repository.StoreImageRepository;
import com.ssafy.babyspot.domain.store.repository.StoreKeywordRepository;
import com.ssafy.babyspot.domain.store.repository.StoreMenuRepository;
import com.ssafy.babyspot.domain.store.repository.StoreRepository;
import com.ssafy.babyspot.exception.CustomException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StoreService {

	private final S3Component s3Component;
	private final MemberRepository memberRepository;
	@Value("${CLOUDFRONT_URL}")
	private String CLOUDFRONT_URL;

	private final StoreRepository storeRepository;
	private final StoreImageRepository storeImageRepository;
	private final StoreMenuRepository storeMenuRepository;
	private final StoreKeywordRepository storeKeywordRepository;
	private final KeywordReviewRepository keywordReviewRepository;
	private final SentimentAnalysisRepository sentimentAnalysisRepository;
	private final ReviewRepository reviewRepository;
	private final ConvenienceService convenienceService;
	// private final StoreImageService storeImageService;
	private static final Logger logger = LoggerFactory.getLogger(StoreService.class);

	@Transactional
	public List<StoreDefaultInfoDto> getStoresInRange(Double topLeftLat, Double topLeftLong,
		Double bottomRightLat, Double bottomRightLong) {

		double minLat = Math.min(topLeftLat, bottomRightLat);
		double maxLat = Math.max(topLeftLat, bottomRightLat);
		double minLong = Math.min(topLeftLong, bottomRightLong);
		double maxLong = Math.max(topLeftLong, bottomRightLong);

		double centerLong = (minLong + maxLong) / 2;
		double centerLat = (minLat + maxLat) / 2;

		List<Store> stores = storeRepository.findStoresInRange(minLong, minLat, maxLong, maxLat, centerLong, centerLat);
		logger.info("Number of stores found: " + stores.size());

		return stores.stream()
			.map(store -> {
				RatingInfo ratingInfo = computeRatingInfo(store.getId());
				StoreDefaultInfoDto dto = new StoreDefaultInfoDto();
				dto.setStoreId(store.getId());
				dto.setLatitude(store.getLocation().getY()); // 위도
				dto.setLongitude(store.getLocation().getX()); // 경도
				dto.setAddress(store.getAddress());
				dto.setRating(getRating(store.getId()));
				dto.setReviewCount(ratingInfo.getReviewCount());
				dto.setBusinessHour(store.getBusinessHour());
				dto.setContactNumber(store.getContactNumber());
				dto.setTitle(store.getTitle());
				dto.setTransportationConvenience(store.getTransportationConvenience());
				dto.setReviewCount(store.getReviewCount());
				dto.setParking(store.getParking());
				dto.setOkZone(store.getOkZone());
				dto.setCategory(store.getCategory());
				dto.setBabyAges(store.getBabyAges() != null ? store.getBabyAges() : new ArrayList<>());

				ConvenienceDto convenienceDto = new ConvenienceDto();
				convenienceDto.getConvenienceDetails().put("babyChair", store.getBabyChair());
				convenienceDto.getConvenienceDetails().put("babyTableware", store.getBabyTableware());
				convenienceDto.getConvenienceDetails().put("playZone", store.getPlayZone());
				convenienceDto.getConvenienceDetails().put("nursingRoom", store.getNursingRoom());
				convenienceDto.getConvenienceDetails().put("groupTable", store.getGroupTable());

				List<StoreImageDto> storeImages = getStoreImages(store.getId());
				dto.setImages(storeImages);
				dto.setRating(store.getRating());

				dto.setConvenience(List.of(convenienceDto));

				return dto;
			})
			.collect(Collectors.toList());
	}

	@Transactional
	public StoreDefaultInfoDto getStoreInfo(int storeId) {
		Store store = storeRepository.findById(storeId)
			.orElseThrow(() -> new CustomException(HttpStatus.NOT_FOUND, "해당 매장이 없습니다."));

		RatingInfo ratingInfo = computeRatingInfo(storeId);

		StoreDefaultInfoDto dto = new StoreDefaultInfoDto();
		dto.setStoreId(store.getId());
		dto.setLatitude(store.getLocation().getY());
		dto.setLongitude(store.getLocation().getX());
		dto.setAddress(store.getAddress());
		dto.setRating(Float.valueOf(getRating(store.getId())));
		dto.setReviewCount(ratingInfo.getReviewCount());
		dto.setBusinessHour(store.getBusinessHour());
		dto.setContactNumber(store.getContactNumber());
		dto.setTitle(store.getTitle());
		dto.setTransportationConvenience(store.getTransportationConvenience());
		dto.setParking(store.getParking());
		dto.setOkZone(store.getOkZone());
		dto.setCategory(store.getCategory());
		dto.setBabyAges(store.getBabyAges() != null ? store.getBabyAges() : new ArrayList<>());

		ConvenienceDto convenienceDto = new ConvenienceDto();
		convenienceDto.getConvenienceDetails().put("babyChair", store.getBabyChair());
		convenienceDto.getConvenienceDetails().put("babyTableware", store.getBabyTableware());
		convenienceDto.getConvenienceDetails().put("playZone", store.getPlayZone());
		convenienceDto.getConvenienceDetails().put("nursingRoom", store.getNursingRoom());
		convenienceDto.getConvenienceDetails().put("groupTable", store.getGroupTable());
		dto.setConvenience(List.of(convenienceDto));

		List<StoreImageDto> storeImages = getStoreImages(store.getId());
		dto.setImages(storeImages);

		return dto;
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
	public float getRating(int storeId) {
		Store store = storeRepository.findById(storeId)
			.orElseThrow(() -> new CustomException(HttpStatus.NOT_FOUND, "매장이 없습니다."));
		Page<Review> reviewPage = reviewRepository.findAllByStore_Id(storeId, Pageable.unpaged());
		List<Review> reviews = reviewPage.getContent();

		if (reviews.isEmpty()) {
			store.setRating(0f);
			store.setReviewCount(0);
			storeRepository.save(store);
			return 0f;
		}

		int reviewCount = reviews.size();
		double totalRating = reviews.stream()
			.mapToDouble(Review::getRating)
			.sum();

		float avg = (float)(totalRating / reviewCount);

		if (store.getRating() != avg || store.getReviewCount() != reviewCount) {
			store.setRating(avg);
			store.setReviewCount(reviewCount);
			storeRepository.save(store);
		}

		return avg;
	}

	@Transactional
	public List<KidsMenuDto> getKidsMenu(int storeId) {
		List<String> kidsMenuNames = storeRepository.findById(storeId)
			.map(Store::getKidsMenu)
			.orElse(Collections.emptyList());

		List<StoreMenu> storeMenus = storeMenuRepository.findAllByStore_Id(storeId);

		Map<String, StoreMenu> menuMap = storeMenus.stream()
			.collect(Collectors.toMap(StoreMenu::getName, Function.identity()));

		return kidsMenuNames.stream()
			.map(kidsMenuName -> {
				StoreMenu menu = menuMap.get(kidsMenuName);
				Integer price = (menu != null) ? menu.getPrice() : null;

				KidsMenuDto dto = new KidsMenuDto();
				dto.setBabyMenuName(kidsMenuName);
				dto.setBabyMenuPrice(price);

				return dto;
			})
			.collect(Collectors.toList());
	}

	@Transactional
	public KeywordSectionDto getKeywordsAndReviews(int storeId) {
		List<StoreKeyword> keywords = storeKeywordRepository.findAllByStore_Id(storeId);
		List<KeywordReview> allReviews = keywordReviewRepository.findAllByStoreKeyword_Store_Id(storeId);

		Map<Integer, List<KeywordReviewDto>> keywordReviewMap = allReviews.stream()
			.collect(Collectors.groupingBy(
				r -> r.getStoreKeyword().getId(),
				Collectors.mapping(
					r -> new KeywordReviewDto(r.getSource(), r.getReview()),
					Collectors.toList()
				)
			));

		int totalCount = keywords.stream()
			.mapToInt(StoreKeyword::getCount)
			.sum();

		List<KeywordDto> keywordDto = keywords.stream()
			.map(k -> new KeywordDto(
				k.getKeyword(),
				k.getCount(),
				keywordReviewMap.getOrDefault(k.getId(), Collections.emptyList())
			))
			.collect(Collectors.toList());

		KeywordSectionDto result = new KeywordSectionDto(keywordDto, totalCount);

		logger.info("KeywordSectionDto 결과: {}", result);

		return result;
	}

	@Transactional
	public SentimentAnalysisDto getSentimentAnalysis(int storeId) {
		List<SentimentAnalysis> sentiments = sentimentAnalysisRepository.findAllByStore_Id(storeId);
		String posSummary = "";
		List<String> posReviews = new ArrayList<>();
		String negSummary = "";
		List<String> negReviews = new ArrayList<>();

		for (SentimentAnalysis sentiment : sentiments) {
			List<String> posList = sentiment.getPositive();
			if (posList != null && !posList.isEmpty()) {
				posSummary = posList.get(0);
				if (posList.size() > 1) {
					posReviews.addAll(posList.subList(1, posList.size()));
				}
			}
			List<String> negList = sentiment.getNegative();
			if (negList != null && !negList.isEmpty()) {
				negSummary = negList.get(0);
				if (negList.size() > 1) {
					negReviews.addAll(negList.subList(1, negList.size()));
				}
			}
		}

		return new SentimentAnalysisDto(posSummary, posReviews, negSummary, negReviews);
	}

	@Transactional
	public StoreDetailDto getStoreDetail(int storeId) {

		Store store = storeRepository.findById(storeId)
			.orElseThrow(() -> new CustomException(HttpStatus.NOT_FOUND, "존재하지 않는 매장입니다."));

		List<StoreImageDto> storeImages = getStoreImages(storeId);
		List<StoreMenuDto> storeMenus = getStoreMenus(storeId);
		KeywordSectionDto keywordSection = getKeywordsAndReviews(storeId);
		SentimentAnalysisDto sentiment = getSentimentAnalysis(storeId);
		List<KidsMenuDto> kidsMenus = getKidsMenu(storeId);
		float storeRating = getRating(storeId);

		RatingInfo ratingInfo = computeRatingInfo(storeId);

		Pageable pageable = PageRequest.of(0, 3, Sort.by("createdAt").descending());
		Page<Review> reviewPage = reviewRepository.findAllByStore_IdOrderByCreatedAtDesc(storeId, pageable);
		List<ConveniencePlaceDTO> conveniencePlace = convenienceService.findNearestConveniences(storeId);
		List<ReviewResponseDto> latestReviews = reviewPage.stream().map(review -> {
			ReviewResponseDto dto = new ReviewResponseDto();
			int memberId = review.getMember().getId();
			Optional<String> profileOpt = memberRepository.findByProfileImg(review.getMember().getId());
			String profile = profileOpt.orElse(null);

			dto.setReviewId(review.getId());
			dto.setMemberId(review.getMember().getId());
			dto.setMemberNickname(review.getMember().getNickname());
			dto.setStoreId(review.getStore().getId());
			dto.setRating(review.getRating());
			dto.setCreatedAt(review.getCreatedAt());
			dto.setContent(review.getContent());
			dto.setBabyAges(review.getBabyAges());
			dto.setStoreName(review.getStore().getTitle());
			dto.setProfile(profile == null ? null : CLOUDFRONT_URL + "/" + profile);
			dto.setOkZone(store.getOkZone());
			dto.setCategory(store.getCategory());
			dto.setReviewCount(reviewRepository.countByMember_Id(memberId));

			List<String> imgUrls = review.getImages().stream()
				.map(img -> CLOUDFRONT_URL + "/" + img.getImageUrl() + "?v=" + System.currentTimeMillis())
				.collect(Collectors.toList());
			dto.setImgUrls(imgUrls);
			dto.setLikeCount(review.getReviewLikes().size());
			return dto;
		}).collect(Collectors.toList());

		StoreDefaultInfoDto defaultInfo = getStoreInfo(storeId);

		List<Integer> babyAges = store.getBabyAges();
		if (babyAges == null) {
			babyAges = new ArrayList<>();
		}

		return StoreDetailDto.builder()
			.storeId(store.getId())
			.storeName(store.getTitle())
			.images(storeImages)
			.menus(storeMenus)
			.keywordSection(keywordSection)
			.sentiment(sentiment)
			.kidsMenu(kidsMenus)
			.latestReviews(latestReviews)
			.babyAges(babyAges)
			.rating(storeRating)
			.reviewCount(ratingInfo.getReviewCount())
			.conveniencePlace(conveniencePlace)
			.defaultInfo(defaultInfo)
			.build();
	}

	@Scheduled(cron = "0 0 * * * *")
	@Transactional
	public void updateStoreRecommendedBabyAges() {
		List<Store> stores = storeRepository.findAll();
		if (stores.isEmpty()) {
			return;
		}

		for (Store store : stores) {
			Page<Review> reviewPage = reviewRepository.findAllByStore_Id(store.getId(), Pageable.unpaged());
			List<Review> reviews = reviewPage.getContent();

			if (reviews.isEmpty()) {
				store.setBabyAges(null);
				storeRepository.save(store);
				continue;
			}

			Map<Integer, List<Integer>> ageToRoundedRatings = new HashMap<>();
			Map<Integer, Integer> ageFrequency = new HashMap<>();

			for (Review review : reviews) {
				int roundedRating = Math.round(review.getRating());
				for (Integer age : review.getBabyAges()) {
					ageToRoundedRatings.computeIfAbsent(age, a -> new ArrayList<>()).add(roundedRating);
					ageFrequency.put(age, ageFrequency.getOrDefault(age, 0) + 1);
				}
			}

			Map<Integer, Integer> ageToAvg = new HashMap<>();
			for (Map.Entry<Integer, List<Integer>> entry : ageToRoundedRatings.entrySet()) {
				int sum = entry.getValue().stream().mapToInt(Integer::intValue).sum();
				int count = entry.getValue().size();
				int avg = Math.round((float)sum / count);
				ageToAvg.put(entry.getKey(), avg);
			}

			List<Integer> recommendedAges = ageToAvg.entrySet().stream()
				.sorted((e1, e2) -> {
					int comp = Integer.compare(e2.getValue(), e1.getValue());
					if (comp == 0) {
						return Integer.compare(ageFrequency.get(e2.getKey()), ageFrequency.get(e1.getKey()));
					}
					return comp;
				})
				.limit(2)
				.map(Map.Entry::getKey)
				.collect(Collectors.toList());

			if (recommendedAges.isEmpty()) {
				store.setBabyAges(null);
			} else {
				store.setBabyAges(recommendedAges);
			}
			storeRepository.save(store);
		}
	}

	@Transactional
	public RatingInfo computeRatingInfo(int storeId) {
		List<Review> reviews = reviewRepository.findAllByStore_Id(storeId, Pageable.unpaged()).getContent();

		int reviewCount = reviews.size();
		double totalRating = reviews.stream()
			.mapToDouble(Review::getRating)
			.sum();
		float avgRating = reviewCount > 0 ? (float)(totalRating / reviewCount) : 0f;

		return new RatingInfo(avgRating, reviewCount);
	}

}