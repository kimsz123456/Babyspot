package com.ssafy.babyspot.domain.store.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.babyspot.domain.store.dto.StoreDefaultInfoDto;
import com.ssafy.babyspot.domain.store.dto.StoreDetailDto;
import com.ssafy.babyspot.domain.store.service.StoreService;

@RestController
@RequestMapping("/api/store")
public class StoreController {

	private final StoreService storeService;

	public StoreController(StoreService storeService) {
		this.storeService = storeService;
	}

	@GetMapping("/rangeinfo")
	public ResponseEntity<List<StoreDefaultInfoDto>> getStoreDefaultInfo(
		@RequestParam Double topLeftLat,
		@RequestParam Double topLeftLong,
		@RequestParam Double bottomRightLat,
		@RequestParam Double bottomRightLong) {

		List<StoreDefaultInfoDto> storeDefaultInfo = storeService.getStoresInRange(topLeftLat, topLeftLong,
			bottomRightLat,
			bottomRightLong);

		return ResponseEntity.ok(storeDefaultInfo);
	}

	@GetMapping("/detail")
	public ResponseEntity<StoreDetailDto> getStoreDetail(@RequestParam int storeId) {
		StoreDetailDto storeDetailDto = storeService.getStoreDetail(storeId);
		return ResponseEntity.ok(storeDetailDto);
	}
}
