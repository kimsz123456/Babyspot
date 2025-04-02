package com.ssafy.babyspot.domain.reveiw.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.babyspot.domain.reveiw.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {
	Page<Review> findAllByStore_Id(int storeId, Pageable pageable);

	Optional<Review> findByStore_IdAndMember_Id(int storeId, int memberId);

	Page<Review> findAllByMember_id(int memberId, Pageable pageable);

	Page<Review> findAllByStore_IdOrderByCreatedAtDesc(int storeId, Pageable pageable);

	@Query("select r.member.id, count(r) from Review r where r.member.id in :memberIds group by r.member.id")
	List<Object[]> countReviewsByMemberIds(@Param("memberIds") Set<Integer> memberIds);

	long countByMember_Id(int memberId);
}
