package com.ssafy.babyspot.domain.search.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.babyspot.domain.member.Member;
import com.ssafy.babyspot.domain.member.repository.MemberRepository;
import com.ssafy.babyspot.domain.search.SearchHistory;
import com.ssafy.babyspot.domain.search.dto.SearchHistoryDto;
import com.ssafy.babyspot.domain.search.repository.SearchHistoryRepository;
import com.ssafy.babyspot.exception.CustomException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SearchService {

	private final SearchHistoryRepository searchHistoryRepository;
	private final MemberRepository memberRepository;

	@Transactional
	public void recordSearch(int memberId, String searchTerm) {
		if (searchTerm == null || searchTerm.isEmpty()) {
			throw new CustomException(HttpStatus.BAD_REQUEST, "검색어가 유효하지 않습니다.");
		}

		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new CustomException(HttpStatus.BAD_REQUEST, "회원이 존재하지 않습니다."));
		Optional<SearchHistory> existing = searchHistoryRepository.findByMember_IdAndSearchTerm(memberId, searchTerm);
		existing.ifPresent(searchHistoryRepository::delete);

		SearchHistory searchHistory = new SearchHistory();
		searchHistory.setMember(member);
		searchHistory.setSearchTerm(searchTerm);
		searchHistoryRepository.save(searchHistory);
	}

	@Transactional(readOnly = true)
	public List<SearchHistoryDto> getRecentSearches(int memberId, int limit) {
		Pageable pageable = PageRequest.of(0, limit);
		List<SearchHistory> history = searchHistoryRepository.findByMember_IdOrderByCreatedAtDesc(memberId, pageable);

		return history.stream()
			.map(h -> new SearchHistoryDto(h.getId(), h.getSearchTerm(), h.getCreatedAt()))
			.collect(Collectors.toList());
	}

	@Transactional
	public void deleteAllRecentSearches(int memberId) {
		List<SearchHistory> searches = searchHistoryRepository.findByMember_Id(memberId);
		if (searches.isEmpty()) {
			throw new CustomException(HttpStatus.NOT_FOUND, "삭제할 검색 기록이 없습니다.");
		}
		searchHistoryRepository.deleteAll(searches);
	}

	@Transactional
	public void deleteSearch(int memberId, int searchId) {
		SearchHistory search = searchHistoryRepository.findById(searchId)
			.orElseThrow(() -> new CustomException(HttpStatus.NOT_FOUND, "해당 검색어가 없습니다."));
		if (search.getMember().getId() != memberId) {
			throw new CustomException(HttpStatus.FORBIDDEN, "권한이 없습니다.");
		}
		searchHistoryRepository.delete(search);
	}
}
