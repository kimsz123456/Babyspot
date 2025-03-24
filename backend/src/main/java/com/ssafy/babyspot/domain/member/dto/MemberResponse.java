package com.ssafy.babyspot.domain.member.dto;

import com.ssafy.babyspot.domain.member.Member;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberResponse {
	private int id;
	private String nickname;
	private String profile_img;
	private String providerId;
	private String message;

	public static MemberResponse fromMember(Member member, String cloudFrontProfileUrl) {
		String profileImgKey = member.getProfileImg();

		String profileImgUrl = (profileImgKey != null && !profileImgKey.isEmpty())
			? cloudFrontProfileUrl + "/" + profileImgKey + "?v=" + System.currentTimeMillis()
			: null;

		return new MemberResponse(member.getId(), member.getNickname(), profileImgUrl, member.getProviderId(), null);
	}

	public static MemberResponse withMessage(String message) {
		return new MemberResponse(-1, null, null, null, message);
	}
}
