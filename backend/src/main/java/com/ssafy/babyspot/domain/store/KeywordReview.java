package com.ssafy.babyspot.domain.store;

import java.util.List;

import com.ssafy.babyspot.converter.ListToJsonConverter;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "keyword_review")
public class KeywordReview {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "store_keyword", nullable = false)
	private StoreKeyword storeKeyword;

	@Column(name = "review", columnDefinition = "json")
	@Convert(converter = ListToJsonConverter.class)
	private List<String> review;
}
