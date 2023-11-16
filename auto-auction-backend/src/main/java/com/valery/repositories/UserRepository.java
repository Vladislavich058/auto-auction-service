package com.valery.repositories;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.valery.entities.ERole;
import com.valery.entities.User;

@RepositoryRestResource(exported = false)
public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByEmail(String email);
	Page<User> findByRoleRole(ERole role, Pageable pageable);
	Iterable<User> findByRoleRole(ERole role);
	void deleteByEmail(String email);
}
