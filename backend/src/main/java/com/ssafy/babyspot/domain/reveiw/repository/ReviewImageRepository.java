package com.ssafy.babyspot.domain.reveiw.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.babyspot.domain.reveiw.ReviewImage;

@Repository
public interface ReviewImageRepository extends CrudRepository<ReviewImage, Integer> {
}
