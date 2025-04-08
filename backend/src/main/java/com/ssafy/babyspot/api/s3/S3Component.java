package com.ssafy.babyspot.api.s3;

import java.net.URL;
import java.time.Duration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import com.ssafy.babyspot.exception.CustomException;

import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.DeleteObjectResponse;
import software.amazon.awssdk.services.s3.model.ListObjectsV2Request;
import software.amazon.awssdk.services.s3.model.ListObjectsV2Response;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;

@Component
public class S3Component {

	private final S3Presigner presigner;
	private final S3Client s3Client;

	@Value("${cloud.aws.s3.babyspot-bucket}")
	private String bucket;

	public S3Component(S3Presigner presigner, S3Client s3Client) {
		this.presigner = presigner;
		this.s3Client = s3Client;
	}

	public Map<String, String> generateProfilePreSignedUrl(String memberId,
		String profileImgFilename,
		String contentType) {
		Map<String, String> urls = new HashMap<>();

		if (profileImgFilename != null && !profileImgFilename.isEmpty()) {
			String profileKey = String.format("profile/%s/%s", memberId, profileImgFilename);

			URL profileImgPreSignedUrl = presigner.presignPutObject(
				PutObjectPresignRequest.builder()
					.signatureDuration(Duration.ofMinutes(10))
					.putObjectRequest(req -> req
						.bucket(bucket)
						.key(profileKey)
						.contentType(contentType))
					.build()
			).url();

			urls.put("profileImgPreSignedUrl", profileImgPreSignedUrl.toString());
			urls.put("profileKey", profileKey);
		}

		return urls;
	}

	public String generatePreSignedUrlForProfileImageUpdate(String profileKey, String contentType) {
		if (profileKey == null || profileKey.isEmpty()) {
			throw new CustomException(HttpStatus.BAD_REQUEST, "프로필 이미지 키가 필요합니다.");
		}

		URL profileImgPreSignedUrl = presigner.presignPutObject(
			PutObjectPresignRequest.builder()
				.signatureDuration(Duration.ofMinutes(10))
				.putObjectRequest(req -> req
					.bucket(bucket)
					.key(profileKey)
					.contentType(contentType))
				.build()
		).url();

		return profileImgPreSignedUrl.toString();
	}

	public Map<String, String> generateReviewImagePreSignedUrl(String storeId, String memberId, String reviewImgName,
		String contentType) {
		if (storeId == null || storeId.isEmpty()) {
			throw new CustomException(HttpStatus.BAD_REQUEST, "매장 ID가 유효하지 않습니다.");
		}
		if (reviewImgName == null || reviewImgName.isEmpty()) {
			throw new CustomException(HttpStatus.BAD_REQUEST, "유효하지않은 이미지입니다.");
		}
		Map<String, String> urls = new HashMap<>();
		String reviewImgKey = String.format("store/reviewImg/%s/%s/%s", storeId, memberId, reviewImgName);

		URL reviewImagePresignedUrl = presigner.presignPutObject(
			PutObjectPresignRequest.builder()
				.signatureDuration(Duration.ofMinutes(10))
				.putObjectRequest(req -> req
					.bucket(bucket)
					.key(reviewImgKey)
					.contentType(contentType))
				.build()
		).url();

		urls.put("reviewImagePresignedUrl", reviewImagePresignedUrl.toString());
		urls.put("reviewImgKey", reviewImgKey);
		return urls;
	}

	public void deleteObject(String key) {
		DeleteObjectRequest deleteRequest = DeleteObjectRequest.builder()
			.bucket(bucket)
			.key(key)
			.build();

		DeleteObjectResponse deleteResponse = s3Client.deleteObject(deleteRequest);
	}

	public List<String> getUploadedImageKeys(int storeId) {
		String s3Prefix = "store/storeImg/" + storeId + "/";

		ListObjectsV2Request listObjects = ListObjectsV2Request.builder()
			.bucket(bucket)
			.prefix(s3Prefix)
			.build();

		ListObjectsV2Response response = s3Client.listObjectsV2(listObjects);

		return response.contents().stream()
			.map(s3Object -> s3Object.key())
			.collect(Collectors.toList());
	}
}
