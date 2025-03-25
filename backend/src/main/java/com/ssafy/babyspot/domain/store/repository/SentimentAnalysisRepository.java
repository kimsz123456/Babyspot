package com.ssafy.babyspot.domain.store.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.babyspot.domain.store.SentimentAnalysis;

@Repository
public interface SentimentAnalysisRepository extends JpaRepository<SentimentAnalysis, Integer> {
	List<SentimentAnalysis> findAllByStore_Id(int storeId);
}
