package com.ssafy.babyspot.domain.convenience.repository;

import java.util.List;

import org.locationtech.jts.geom.Point;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ssafy.babyspot.domain.convenience.Convenience;

@Repository
public interface ConvenienceRepository extends JpaRepository<Convenience, Integer> {

	@Query(value = "SELECT " +
		"  c.title, " +
		"  c.category, " +
		"  CAST(ST_Distance(ST_Transform(c.location, 4326)::geography, CAST(?1 AS geography)) AS integer) as distance, "
		+
		"  CASE " +
		"    WHEN c.naver_id IS NULL OR c.naver_id = '' THEN '' " +
		"    ELSE CONCAT('https://map.naver.com/p/entry/place/', c.naver_id) " +
		"  END as link " +
		"FROM convenience c " +
		"WHERE CAST(ST_Distance(ST_Transform(c.location, 4326)::geography, CAST(?1 AS geography)) AS integer) < 50000 "
		+
		"ORDER BY distance ASC " +
		"LIMIT 3", nativeQuery = true)
	List<Object[]> findTop3NearestByPointWithDistance(Point point);

}