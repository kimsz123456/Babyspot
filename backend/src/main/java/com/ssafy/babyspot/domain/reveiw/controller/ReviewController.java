package com.ssafy.babyspot.domain.reveiw.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.babyspot.domain.reveiw.dto.ReviewImagePreSignedUrlDto;
import com.ssafy.babyspot.domain.reveiw.dto.ReviewRequestDto;
import com.ssafy.babyspot.domain.reveiw.dto.ReviewResponseDto;
import com.ssafy.babyspot.domain.reveiw.dto.UpdateRequestDto;
import com.ssafy.babyspot.domain.reveiw.dto.UpdateReviewResponseDto;
import com.ssafy.babyspot.domain.reveiw.service.ReviewService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {
	private final ReviewService reviewService;

	@PostMapping
	public ResponseEntity<ReviewImagePreSignedUrlDto> createReview(@RequestBody ReviewRequestDto dto) {
		ReviewImagePreSignedUrlDto responseDto = reviewService.createReview(dto);
		return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
	}

	@GetMapping("/{store_id}/list")
	public ResponseEntity<Page<ReviewResponseDto>> getReviews(@PathVariable("store_id") int storeId,
		Pageable pageable) {
		Page<ReviewResponseDto> reviews = reviewService.getReview(storeId, pageable);
		return ResponseEntity.ok(reviews);
	}

	@DeleteMapping("/{review_id}")
	public ResponseEntity<Void> deleteReview(@PathVariable("review_id") int reviewId, Authentication authentication) {
		reviewService.deleteReview(authentication, reviewId);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}

	@PatchMapping("/{review_id}/update")
	public ResponseEntity<UpdateReviewResponseDto> updateReview(
		@PathVariable("review_id") int reviewId,
		Authentication authentication,
		@RequestBody UpdateRequestDto dto) {
		UpdateReviewResponseDto responseDto = reviewService.updateReview(authentication, dto, reviewId);
		return ResponseEntity.ok(responseDto);
	}

}
