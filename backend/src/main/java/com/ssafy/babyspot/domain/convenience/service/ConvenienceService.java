package com.ssafy.babyspot.domain.convenience.service;

import com.ssafy.babyspot.domain.convenience.Convenience;
import com.ssafy.babyspot.domain.convenience.dto.ConveniencePlaceDTO;
import com.ssafy.babyspot.domain.convenience.repository.ConvenienceRepository;
import com.ssafy.babyspot.domain.store.Store;
import com.ssafy.babyspot.domain.store.repository.StoreRepository;
import com.ssafy.babyspot.exception.CustomException;

import lombok.RequiredArgsConstructor;
import org.locationtech.jts.geom.Point;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ConvenienceService {

	private final ConvenienceRepository convenienceRepository;
	private final StoreRepository storeRepository;
	private static final String NAVER_PLACE_URL_PREFIX = "https://map.naver.com/p/entry/place/";

	public List<ConveniencePlaceDTO> findNearestConveniences(int storeId) {

		Store store = storeRepository.findById(storeId)
			.orElseThrow(() -> new CustomException(HttpStatus.NOT_FOUND, "존재하지 않는 매장입니다."));

		Point storeLocation = store.getLocation();

		List<Object[]> nearestConveniences = convenienceRepository
			.findTop3NearestByPointWithDistance(storeLocation);

		List<ConveniencePlaceDTO> result = new ArrayList<>();
		for (Object[] obj : nearestConveniences) {
			Convenience convenience = (Convenience) obj[0];
			Double distance = (Double) obj[1];

			String link = "";
			if (convenience.getNaverId() != null && !convenience.getNaverId().isEmpty()) {
				link = NAVER_PLACE_URL_PREFIX + convenience.getNaverId();
			}

			// DTO 생성 및 추가
			result.add(new ConveniencePlaceDTO(
				convenience.getTitle(),
				convenience.getCategory(),
				(int) Math.round(distance),
				link
			));
		}
		return result;
	}
}