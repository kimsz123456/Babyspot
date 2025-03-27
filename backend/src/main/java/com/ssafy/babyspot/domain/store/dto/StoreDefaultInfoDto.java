package com.ssafy.babyspot.domain.store.dto;

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
	private String businessHour;
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
}
