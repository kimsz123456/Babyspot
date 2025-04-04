package com.ssafy.babyspot.domain.member.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.ssafy.babyspot.domain.member.Baby;
import com.ssafy.babyspot.domain.member.Member;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MemberResponse {
	private int id;
	private String nickname;
	private String profile_img;
	private String providerId;
	private String message;
	private List<Integer> babyBirthYears;

	public static MemberResponse fromMember(Member member, String cloudFrontProfileUrl) {
		String profileImgKey = member.getProfileImg();
		String profileImgUrl = (profileImgKey != null && !profileImgKey.isEmpty())
			? cloudFrontProfileUrl + "/" + profileImgKey + "?v=" + System.currentTimeMillis()
			: null;

		List<Integer> birthYears = member.getBabies().stream()
			.map(Baby::getBirthYear)
			.collect(Collectors.toList());

		return new MemberResponse(
			member.getId(),
			member.getNickname(),
			profileImgUrl,
			member.getProviderId(),
			null,
			birthYears
		);
	}

	public static MemberResponse withMessage(String message) {
		return new MemberResponse(-1, null, null, null, message, null);
	}
}

