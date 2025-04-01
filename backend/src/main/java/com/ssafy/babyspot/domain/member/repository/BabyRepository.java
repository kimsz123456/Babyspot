package com.ssafy.babyspot.domain.member.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import com.ssafy.babyspot.domain.member.Baby;

@Repository
public interface BabyRepository extends JpaRepository<Baby, Integer> {

	@Modifying
	void deleteByMemberId(int memberId);

	List<Baby> findByMember_Id(int memberId);
}