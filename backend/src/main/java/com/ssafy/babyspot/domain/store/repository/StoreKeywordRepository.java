package com.ssafy.babyspot.domain.store.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.babyspot.domain.store.StoreKeyword;

@Repository
public interface StoreKeywordRepository extends JpaRepository<StoreKeyword, Integer> {
	List<StoreKeyword> findAllByStore_Id(Integer storeId);
}
