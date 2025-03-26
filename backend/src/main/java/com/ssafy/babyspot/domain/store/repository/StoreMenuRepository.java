package com.ssafy.babyspot.domain.store.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.babyspot.domain.store.StoreMenu;

@Repository
public interface StoreMenuRepository extends JpaRepository<StoreMenu, Integer> {
	List<StoreMenu> findAllByStore_Id(int id);
}
