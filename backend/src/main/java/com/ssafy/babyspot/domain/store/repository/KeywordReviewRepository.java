package com.ssafy.babyspot.domain.store.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.babyspot.domain.store.KeywordReview;

@Repository
public interface KeywordReviewRepository extends JpaRepository<KeywordReview, Integer> {
	List<KeywordReview> findAllByStoreKeyword_Store_Id(int storeId);

}
