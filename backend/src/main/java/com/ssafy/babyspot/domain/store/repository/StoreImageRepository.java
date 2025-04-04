package com.ssafy.babyspot.domain.store.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.babyspot.domain.store.StoreImage;

@Repository
public interface StoreImageRepository extends JpaRepository<StoreImage, Integer> {
	List<StoreImage> findAllByStore_Id(int storeId);
}
