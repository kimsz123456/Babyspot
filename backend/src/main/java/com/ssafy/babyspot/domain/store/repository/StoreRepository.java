package com.ssafy.babyspot.domain.store.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.babyspot.domain.store.Store;

@Repository
public interface StoreRepository extends JpaRepository<Store, Integer> {

	@Query(value = "SELECT *, " +
		"ST_Distance(s.location, ST_SetSRID(ST_MakePoint(:centerLong, :centerLat), 4326)) AS distance " +
		"FROM store s " +
		"WHERE ST_Within(s.location, ST_MakeEnvelope(:minLong, :minLat, :maxLong, :maxLat, 4326)) " +
		"ORDER BY distance ASC",
		nativeQuery = true)
	List<Store> findStoresInRange(
		@Param("minLong") Double minLong,
		@Param("minLat") Double minLat,
		@Param("maxLong") Double maxLong,
		@Param("maxLat") Double maxLat,
		@Param("centerLong") Double centerLong,
		@Param("centerLat") Double centerLat
	);
}