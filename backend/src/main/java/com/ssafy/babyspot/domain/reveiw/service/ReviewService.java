package com.ssafy.babyspot.domain.reveiw.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.babyspot.api.s3.S3Component;
import com.ssafy.babyspot.domain.member.Member;
import com.ssafy.babyspot.domain.member.repository.MemberRepository;
import com.ssafy.babyspot.domain.reveiw.Review;
import com.ssafy.babyspot.domain.reveiw.ReviewImage;
import com.ssafy.babyspot.domain.reveiw.dto.ImageInfo;
import com.ssafy.babyspot.domain.reveiw.dto.ImageUpdateDto;
import com.ssafy.babyspot.domain.reveiw.dto.ReviewImagePreSignedUrlDto;
import com.ssafy.babyspot.domain.reveiw.dto.ReviewRequestDto;
import com.ssafy.babyspot.domain.reveiw.dto.ReviewResponseDto;
import com.ssafy.babyspot.domain.reveiw.dto.UpdateRequestDto;
import com.ssafy.babyspot.domain.reveiw.dto.UpdateReviewResponseDto;
import com.ssafy.babyspot.domain.reveiw.repository.ReviewImageRepository;
import com.ssafy.babyspot.domain.reveiw.repository.ReviewRepository;
import com.ssafy.babyspot.domain.store.Store;
import com.ssafy.babyspot.domain.store.repository.StoreRepository;
import com.ssafy.babyspot.exception.CustomException;

@Service
public class ReviewService {
	private final ReviewRepository reviewRepository;
	private final ReviewImageRepository reviewImageRepository;
	private final MemberRepository memberRepository;
	private final StoreRepository storeRepository;
	private final S3Component s3Component;
	private final static Logger LOGGER = LoggerFactory.getLogger(ReviewService.class);

	@Value("${CLOUDFRONT_URL}")
	private String CLOUDFRONT_URL;

	public ReviewService(ReviewRepository reviewRepository, ReviewImageRepository reviewImageRepository,
		MemberRepository memberRepository, StoreRepository storeRepository, S3Component s3Component) {
		this.reviewRepository = reviewRepository;
		this.reviewImageRepository = reviewImageRepository;
		this.memberRepository = memberRepository;
		this.storeRepository = storeRepository;
		this.s3Component = s3Component;
	}

	@Transactional
	public ReviewImagePreSignedUrlDto createReview(ReviewRequestDto dto) {
		Member member = memberRepository.findById(dto.getMemberId())
			.orElseThrow(() -> new CustomException(HttpStatus.NOT_FOUND, "회원이 존재하지 않습니다."));
		Store store = storeRepository.findById(dto.getStoreId())
			.orElseThrow(() -> new CustomException(HttpStatus.NOT_FOUND, "매장이 존재하지 않습니다."));

		Review review = new Review();
		review.setMember(member);
		review.setStore(store);
		review.setRating(dto.getRating());
		review.setContent(dto.getContent());
		review.setBabyAges(dto.getBabyAges());
		reviewRepository.save(review);

		List<ImageInfo> imageInfos = new ArrayList<>();
		if (dto.getImgNames() != null && !dto.getImgNames().isEmpty()) {
			for (int i = 0; i < dto.getImgNames().size(); i++) {
				String imageName = dto.getImgNames().get(i);
				String contentType = dto.getContentTypes().get(i);
				Map<String, String> urlMap = s3Component.generateReviewImagePreSignedUrl(
					String.valueOf(store.getId()),
					String.valueOf(member.getId()),
					imageName,
					contentType
				);
				String s3Key = urlMap.get("reviewImgKey");
				String preSignedUrl = urlMap.get("reviewImagePresignedUrl");

				ReviewImage reviewImage = new ReviewImage();
				reviewImage.setReview(review);
				reviewImage.setImageUrl(s3Key);
				reviewImage.setOrderIndex(i + 1);
				reviewImageRepository.save(reviewImage);

				imageInfos.add(new ImageInfo(preSignedUrl, s3Key, contentType));
			}
		}
		return new ReviewImagePreSignedUrlDto(imageInfos);
	}

	@Transactional(readOnly = true)
	public Page<ReviewResponseDto> getReview(int storeId, Pageable pageable) {
		Pageable sortedPageable = PageRequest.of(
			pageable.getPageNumber(),
			pageable.getPageSize(),
			Sort.by("createdAt").descending()
		);

		Page<Review> reviews = reviewRepository.findAllByStore_Id(storeId, sortedPageable);

		Set<Integer> memberIds = reviews.stream()
			.map(review -> review.getMember().getId())
			.collect(Collectors.toSet());

		List<Object[]> counts = reviewRepository.countReviewsByMemberIds(memberIds);
		Map<Integer, Long> reviewCountMap = counts.stream()
			.collect(Collectors.toMap(
				arr -> (Integer)arr[0],
				arr -> (Long)arr[1]
			));

		return reviews.map(review -> {
			ReviewResponseDto dto = new ReviewResponseDto();
			dto.setReviewId(review.getId());
			dto.setMemberId(review.getMember().getId());
			dto.setMemberNickname(review.getMember().getNickname());
			dto.setStoreId(review.getStore().getId());
			dto.setRating(review.getRating());
			dto.setCreatedAt(review.getCreatedAt());
			dto.setContent(review.getContent());
			dto.setBabyAges(review.getBabyAges());
			dto.setProfile(String.valueOf(memberRepository.findByProfileImg(review.getMember().getId())));

			List<String> imgUrls = review.getImages().stream()
				.map(img -> CLOUDFRONT_URL + "/" + img.getImageUrl())
				.collect(Collectors.toList());
			dto.setImgUrls(imgUrls);
			dto.setLikeCount(review.getReviewLikes().size());

			dto.setReviewCount(reviewCountMap.getOrDefault(review.getMember().getId(), 0L));
			return dto;
		});
	}

	@Transactional(readOnly = true)
	public ReviewResponseDto getStoreMyReview(int storeId, int memberId) {
		Review review = reviewRepository.findByStore_IdAndMember_Id(storeId, memberId)
			.orElseThrow(() -> new CustomException(HttpStatus.NOT_FOUND, "해당 매장에 나의 리뷰가 없습니다."));

		ReviewResponseDto dto = new ReviewResponseDto();
		dto.setReviewId(review.getId());
		dto.setMemberId(review.getMember().getId());
		dto.setMemberNickname(review.getMember().getNickname());
		dto.setStoreId(review.getStore().getId());
		dto.setRating(review.getRating());
		dto.setCreatedAt(review.getCreatedAt());
		dto.setContent(review.getContent());
		dto.setBabyAges(review.getBabyAges());
		dto.setProfile(String.valueOf(
			Optional.of(CLOUDFRONT_URL + "/" + memberRepository.findByProfileImg(review.getMember().getId()))));

		List<String> imgUrls = review.getImages().stream()
			.map(img -> CLOUDFRONT_URL + "/" + img.getImageUrl())
			.collect(Collectors.toList());
		dto.setImgUrls(imgUrls);
		dto.setLikeCount(review.getReviewLikes().size());

		long myReviewCount = reviewRepository.countByMember_Id(memberId);
		dto.setReviewCount(myReviewCount);

		return dto;
	}

	@Transactional(readOnly = true)
	public Page<ReviewResponseDto> getMyReview(int memberId, Pageable pageable) {
		Pageable sortedPageable = PageRequest.of(
			pageable.getPageNumber(),
			pageable.getPageSize(),
			Sort.by("createdAt").descending()
		);

		Page<Review> reviews = reviewRepository.findAllByMember_id(memberId, sortedPageable);

		long myReviewCount = reviewRepository.countByMember_Id(memberId);

		return reviews.map(review -> {
			ReviewResponseDto dto = new ReviewResponseDto();
			dto.setReviewId(review.getId());
			dto.setMemberId(review.getMember().getId());
			dto.setMemberNickname(review.getMember().getNickname());
			dto.setStoreId(review.getStore().getId());
			dto.setRating(review.getRating());
			dto.setCreatedAt(review.getCreatedAt());
			dto.setContent(review.getContent());
			dto.setBabyAges(review.getBabyAges());
			dto.setProfile(String.valueOf(
				Optional.of(CLOUDFRONT_URL + "/" + memberRepository.findByProfileImg(review.getMember().getId()))));

			List<String> imgUrls = review.getImages().stream()
				.map(img -> CLOUDFRONT_URL + "/" + img.getImageUrl())
				.collect(Collectors.toList());
			dto.setImgUrls(imgUrls);
			dto.setLikeCount(review.getReviewLikes().size());

			dto.setReviewCount(myReviewCount);

			return dto;
		});
	}

	@Transactional
	public void deleteReview(Authentication authentication, int reviewId) {
		Review review = reviewRepository.findById(reviewId)
			.orElseThrow(() -> new CustomException(HttpStatus.NOT_FOUND, "리뷰가 없습니다."));

		int reviewMemberId = review.getMember().getId();
		int authenticatedMemberId = Integer.parseInt(authentication.getName());

		if (reviewMemberId != authenticatedMemberId) {
			throw new CustomException(HttpStatus.FORBIDDEN, "삭제 권한이 없습니다.");
		}
		reviewRepository.delete(review);
	}

	@Transactional
	public UpdateReviewResponseDto updateReview(Authentication authentication, UpdateRequestDto dto,
		int reviewId) {
		Review review = reviewRepository.findById(reviewId)
			.orElseThrow(() -> new CustomException(HttpStatus.NOT_FOUND, "리뷰가 없습니다."));

		int reviewMemberId = review.getMember().getId();
		int authenticatedMemberId = Integer.parseInt(authentication.getName());

		LOGGER.info("Authenticated Member ID = {}", authentication.getName());
		LOGGER.info("Review Member ID = {}", review.getMember().getId());

		if (reviewMemberId != authenticatedMemberId) {
			throw new CustomException(HttpStatus.FORBIDDEN, "수정 권한이 없습니다.");
		}

		if (dto.getRating() != null && dto.getRating() != review.getRating()) {
			review.setRating(dto.getRating());
		}
		if (dto.getContent() != null) {
			review.setContent(dto.getContent());
		}
		review.getImages().clear();
		List<Map<String, String>> preSignedUrlList = new ArrayList<>();
		if (dto.getImages() != null) {
			for (ImageUpdateDto imgUpdate : dto.getImages()) {
				Map<String, String> urlMap = s3Component.generateReviewImagePreSignedUrl(
					String.valueOf(review.getStore().getId()),
					String.valueOf(review.getMember().getId()),
					imgUpdate.getImageName(),
					imgUpdate.getContentType()
				);
				String s3Key = urlMap.get("reviewImgKey");

				ReviewImage reviewImage = new ReviewImage();
				reviewImage.setReview(review);
				reviewImage.setImageUrl(s3Key);
				reviewImage.setOrderIndex(imgUpdate.getOrderIndex());
				reviewImageRepository.save(reviewImage);

				preSignedUrlList.add(urlMap);
			}
		}

		UpdateReviewResponseDto responseDto = new UpdateReviewResponseDto();
		responseDto.setReviewId(review.getId());
		responseDto.setPreSignedUrls(preSignedUrlList);

		return responseDto;
	}
}
