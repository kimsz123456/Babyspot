package com.ssafy.babyspot.api.s3;

import java.net.URL;
import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import com.ssafy.babyspot.exception.CustomException;

import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;

@Component
public class S3Component {

	private final S3Presigner presigner;

	@Value("${cloud.aws.s3.profile-bucket}")
	private String profileBucket;

	@Value("${cloud.aws.s3.storeimg-bucket}")
	private String storeImgBucket;

	public S3Component(S3Presigner presigner) {
		this.presigner = presigner;
	}

	public Map<String, String> generateProfilePreSignedUrl(String memberId, String nickname,
		String profileImgFilename) {
		Map<String, String> urls = new HashMap<>();

		if (profileImgFilename != null && !profileImgFilename.isEmpty()) {
			String profileKey = nickname + " " + "id= " + memberId + "/profile/" + profileImgFilename;
			URL profileImgPreSignedUrl = presigner.presignPutObject(PutObjectPresignRequest.builder().
				signatureDuration(Duration.ofMinutes(10))
				.putObjectRequest(req -> req.bucket(profileBucket).key(profileKey).contentType("image/jpeg"))
				.build()).url();

			urls.put("profileImgPreSignedUrl", profileImgPreSignedUrl.toString());
			urls.put("profileKey", profileKey);
		}
		return urls;
	}

	public String generatePreSignedUrlForProfileImageUpdate(String profileKey) {
		if (profileKey != null && !profileKey.isEmpty()) {
			throw new CustomException(HttpStatus.NOT_FOUND, "프로필 이미지 키가 필요합니다.");
		}

		URL profileImgPreSignedUrl = presigner.presignPutObject(PutObjectPresignRequest.builder()
			.signatureDuration(Duration.ofMinutes(10))
			.putObjectRequest(req -> req.bucket(profileBucket)
				.key(profileKey)
				.contentType("image/jpeg"))
			.build()).url();

		return profileImgPreSignedUrl.toString();
	}
}
