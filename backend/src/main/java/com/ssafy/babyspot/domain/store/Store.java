package com.ssafy.babyspot.domain.store;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import org.locationtech.jts.geom.Point;

import com.ssafy.babyspot.converter.ListToJsonConverter;
import com.ssafy.babyspot.domain.reveiw.Review;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "store")
public class Store {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String title;

	@JdbcTypeCode(SqlTypes.GEOMETRY)
	@Column(columnDefinition = "geometry(Point,4326)", nullable = false)
	private Point location;

	private Boolean okZone;
	private String address;
	private String contactNumber;
	private String transportationConvenience;
	private String category;

	@JdbcTypeCode(SqlTypes.JSON)
	@Column(columnDefinition = "jsonb")
	@Setter
	private List<Integer> babyAges;

	@JdbcTypeCode(SqlTypes.JSON)
	@Column(columnDefinition = "jsonb")
	private Map<String, String> businessHour;

	@Setter
	private float rating;
	@Setter
	private int reviewCount;

	private Boolean babyChair;
	private Boolean babyTableware;
	private Boolean strollerAccess;
	private Boolean diaperChangingStation;
	private Boolean nursingRoom;
	private Boolean groupTable;
	private Boolean playZone;
	private Boolean parking;

	@Column(name = "kids_menu", columnDefinition = "json")
	@Convert(converter = ListToJsonConverter.class)
	private List<String> kidsMenu;

	@OneToMany(mappedBy = "store")
	private List<StoreMenu> menus = new ArrayList<>();

	@OneToMany(mappedBy = "store")
	private List<StoreKeyword> keywords = new ArrayList<>();

	@OneToMany(mappedBy = "store")
	private List<StoreImage> images = new ArrayList<>();

	@OneToMany(mappedBy = "store")
	private List<Review> reviews = new ArrayList<>();
}
