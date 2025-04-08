package com.ssafy.babyspot.domain.convenience.repository;

import com.ssafy.babyspot.domain.convenience.Convenience;
import org.locationtech.jts.geom.Point;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConvenienceRepository extends JpaRepository<Convenience, Integer> {

	@Query(value = "SELECT c.*, ST_Distance(c.location, :point) as distance FROM convenience c " +
		"ORDER BY distance " +
		"LIMIT 3", nativeQuery = true)
	List<Object[]> findTop3NearestByPointWithDistance(@Param("point") Point point);
}