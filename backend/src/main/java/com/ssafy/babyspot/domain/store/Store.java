package com.ssafy.babyspot.domain.store;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import org.locationtech.jts.geom.Point;

import com.ssafy.babyspot.domain.reveiw.Review;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
	private String category;
	private String address;
	private String contactNumber;
	private String transportationConvenience;
	private String businessHour;
	private float rating;
	private int reviewCount;

	private Boolean babyChair;
	private Boolean babyTableware;
	private Boolean strollerAccess;
	private Boolean diaperChangingStation;
	private Boolean nursingRoom;

	private String kidsMenu;

	@OneToMany(mappedBy = "store")
	private List<StoreMenu> menus = new ArrayList<>();

	@OneToMany(mappedBy = "store")
	private List<StoreKeyword> keywords = new ArrayList<>();

	@OneToMany(mappedBy = "store")
	private List<StoreImage> images = new ArrayList<>();

	@OneToMany(mappedBy = "store")
	private List<Review> reviews = new ArrayList<>();
}
