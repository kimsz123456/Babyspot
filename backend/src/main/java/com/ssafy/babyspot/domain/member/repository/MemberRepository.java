package com.ssafy.babyspot.domain.member.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.babyspot.domain.member.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {

	@Query("SELECT m.profileImg FROM Member m WHERE m.id = :id AND m.deleted = false")
	Optional<String> findByProfileImg(@Param("id") Integer id);

	Optional<Member> findByNicknameAndDeletedFalse(String nickname);

	Optional<Member> findByProviderIdAndDeletedFalse(String providerId);

	Optional<Member> findByProviderId(String providerId);

	Optional<Member> findByNickname(String nickname);
}
