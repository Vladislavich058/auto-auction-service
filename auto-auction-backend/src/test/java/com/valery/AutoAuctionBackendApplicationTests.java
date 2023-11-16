package com.valery;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.valery.controllers.CarController;

@SpringBootTest
class AutoAuctionBackendApplicationTests {

	@Autowired
	private CarController controller;

	@DisplayName("First example test case")
	@Test
	void contextLoads() {
		assertThat(controller).isNotNull();
	}

}
