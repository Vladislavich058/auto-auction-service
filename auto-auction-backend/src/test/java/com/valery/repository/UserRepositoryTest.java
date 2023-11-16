package com.valery.repository;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.valery.entities.ERole;
import com.valery.entities.Role;
import com.valery.entities.User;
import com.valery.repositories.UserRepository;

@DataJpaTest
public class UserRepositoryTest {
	@Autowired
	UserRepository userRepository;

	@Test
	void saveUser() {
		userRepository.save(User.builder().email("testuser@user.com").name("TestUserName").surname("TestUserSurname")
				.password("TestUserPassword").role(Role.builder().role(ERole.ROLE_USER).build()).phone("80291234567")
				.build());
		assertThat(userRepository.findByEmail("testuser@user.com").isPresent()).isTrue();
	}

	@Test
	void deleteUser() {
		userRepository.deleteByEmail("testuser@user.com");
		assertThat(userRepository.findByEmail("testuser@user.com").isEmpty()).isTrue();
	}
}
