package com.ssafy.babyspot.domain.convenience.service;

import java.util.ArrayList;
import java.util.List;

import org.locationtech.jts.geom.Point;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.ssafy.babyspot.domain.convenience.dto.ConveniencePlaceDTO;
import com.ssafy.babyspot.domain.convenience.repository.ConvenienceRepository;
import com.ssafy.babyspot.domain.store.Store;
import com.ssafy.babyspot.domain.store.repository.StoreRepository;
import com.ssafy.babyspot.exception.CustomException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ConvenienceService {

	private final ConvenienceRepository convenienceRepository;
	private final StoreRepository storeRepository;
	private static final String NAVER_PLACE_URL_PREFIX = "https://map.naver.com/p/entry/place/";
	private final Logger logger = LoggerFactory.getLogger(ConvenienceService.class);

	public List<ConveniencePlaceDTO> findNearestConveniences(int storeId) {

		Store store = storeRepository.findById(storeId)
			.orElseThrow(() -> new CustomException(HttpStatus.NOT_FOUND, "존재하지 않는 매장입니다."));

		Point storeLocation = store.getLocation();
		logger.info("storeLocation: {}", storeLocation);

		List<Object[]> nearestConveniences = convenienceRepository
			.findTop3NearestByPointWithDistance(storeLocation);

		List<ConveniencePlaceDTO> result = new ArrayList<>();
		for (Object[] row : nearestConveniences) {
			String title = (String)row[0];
			String category = (String)row[1];
			int distance = ((Number)row[2]).intValue();
			String link = (String)row[3];

			result.add(new ConveniencePlaceDTO(title, category, distance, link));
		}

		return result;
	}
}