package com.ssafy.babyspot.domain.search.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.babyspot.domain.search.dto.SearchHistoryDto;
import com.ssafy.babyspot.domain.search.service.SearchService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/search")
@RequiredArgsConstructor
public class SearchController {

	private final SearchService searchService;

	@PostMapping("/record")
	public ResponseEntity<Void> recordSearch(@RequestParam String term, Authentication authentication) {
		int memberId = Integer.parseInt(authentication.getName());
		searchService.recordSearch(memberId, term);
		return ResponseEntity.ok().build();
	}

	@GetMapping("/recent")
	public ResponseEntity<List<SearchHistoryDto>> getRecentSearches(Authentication authentication,
		@RequestParam(defaultValue = "20") int limit) {

		int memberId = Integer.parseInt(authentication.getName());
		List<SearchHistoryDto> recentSearches = searchService.getRecentSearches(memberId, limit);
		return ResponseEntity.ok(recentSearches);
	}

	@DeleteMapping("/recent")
	public ResponseEntity<Void> deleteAllRecentSearches(Authentication authentication) {
		int memberId = Integer.parseInt(authentication.getName());
		searchService.deleteAllRecentSearches(memberId);
		return ResponseEntity.noContent().build();
	}

	@DeleteMapping("/recent/{searchId}")
	public ResponseEntity<Void> deleteRecentSearch(@PathVariable int searchId, Authentication authentication) {
		int memberId = Integer.parseInt(authentication.getName());
		searchService.deleteSearch(memberId, searchId);
		return ResponseEntity.noContent().build();
	}
}
