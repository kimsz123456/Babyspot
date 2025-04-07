package com.ssafy.babyspot.domain.member;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.ssafy.babyspot.domain.reveiw.Review;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter
@Table(name = "member")
public class Member {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Setter
	@Column(name = "profile_img", length = 255)
	private String profileImg;

	@Column(name = "providerid", length = 100, unique = true, nullable = false)
	private String providerId;

	@Setter
	@Column(name = "nickname", length = 20, unique = true, nullable = false)
	private String nickname;

	@Column(name = "created_at", nullable = false, updatable = false)
	private LocalDate createdAt;

	@Column(name = "deleted_at")
	private LocalDate deletedAt;

	@Setter
	@Column(name = "deleted")
	private boolean deleted = false;

	@OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Baby> babies = new ArrayList<>();

	@OneToMany(mappedBy = "member")
	private List<Review> reviews = new ArrayList<>();

	@Builder
	public Member(String providerId, String nickname, String profileImg) {
		this.providerId = providerId;
		this.nickname = nickname;
		this.profileImg = profileImg;
	}

	@PrePersist
	protected void onCreate() {
		this.createdAt = LocalDate.now();
		this.deletedAt = null;
	}
}
