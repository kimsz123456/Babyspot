package com.ssafy.babyspot.domain.search.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.babyspot.domain.search.SearchHistory;

@Repository
public interface SearchHistoryRepository extends JpaRepository<SearchHistory, Integer> {

	List<SearchHistory> findByMember_IdOrderByCreatedAtDesc(int memberId, Pageable pageable);

	Optional<SearchHistory> findByMember_IdAndSearchTerm(int memberId, String searchTerm);

	List<SearchHistory> findByMember_Id(int memberId);
}
