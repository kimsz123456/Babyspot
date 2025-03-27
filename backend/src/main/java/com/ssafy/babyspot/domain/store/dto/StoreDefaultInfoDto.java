package com.ssafy.babyspot.domain.store.dto;

import java.util.List;
import java.util.Map;

import lombok.Data;

@Data
public class StoreDefaultInfoDto {
	private int StoreId;
	private Double Latitude;
	private Double Longitude;
	private String title;
	private String address;
	private String contactNumber;
	private String transportationConvenience;
	private Map<String, String> businessHour;
	private Float rating;
	private Integer reviewCount;
	private Boolean babyChair;
	private Boolean babyTableware;
	private Boolean strollerAccess;
	private Boolean diaperChangingStation;
	private Boolean nursingRoom;
	private Boolean groupTable;
	private Boolean playZone;
	private String kidsMenu;
	private Boolean parking;
	private Boolean okZone;
	private String category;
	private List<Integer> babyAges;
	private List<StoreImageDto> images;
}