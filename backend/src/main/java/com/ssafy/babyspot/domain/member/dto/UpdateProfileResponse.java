package com.ssafy.babyspot.domain.member.dto;

import com.ssafy.babyspot.domain.member.Member;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UpdateProfileResponse {
	private String nickname;
	private String preSignedUrl;
	private String profileImgUrl;

	public static UpdateProfileResponse fromMember(Member member, String cloudFrontProfileUrl, String preSignedUrl) {
		String profileImgKey = member.getProfileImg();
		String profileImgUrl = (profileImgKey != null && !profileImgKey.isEmpty())
			? cloudFrontProfileUrl + "/" + profileImgKey + "?v=" + System.currentTimeMillis()
			: null;
		return new UpdateProfileResponse(member.getNickname(), preSignedUrl, profileImgUrl);
	}

	public static UpdateProfileResponse withMessage(String message) {
		return new UpdateProfileResponse(message, null, null);
	}
}
