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
@NoArgsConstructor
@Getter
@Table(name = "sentiment_analysis")
public class SentimentAnalysis {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "store_id", nullable = false)
	private Store store;

	@Column(name = "positive", columnDefinition = "json")
	@Convert(converter = ListToJsonConverter.class)
	private List<String> positive;

	@Column(name = "negative", columnDefinition = "json")
	@Convert(converter = ListToJsonConverter.class)
	private List<String> negative;
}
