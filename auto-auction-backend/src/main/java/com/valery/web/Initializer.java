package com.valery.web;

import java.time.LocalDateTime;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.valery.entities.Car;
import com.valery.entities.ELotStatus;
import com.valery.entities.ERole;
import com.valery.entities.File;
import com.valery.entities.Lot;
import com.valery.entities.LotStatus;
import com.valery.entities.Role;
import com.valery.entities.User;
import com.valery.exceptions.NotFoundException;
import com.valery.repositories.CarRepository;
import com.valery.repositories.LotRepository;
import com.valery.repositories.LotStatusRepository;
import com.valery.repositories.RoleRepository;
import com.valery.repositories.UserRepository;

@Component
public class Initializer implements CommandLineRunner {

	@Autowired
	private CarRepository carRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private LotStatusRepository lotStatusRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private LotRepository lotRepository;

	@Override
	public void run(String... args) throws Exception {

		if (lotStatusRepository.findAll().isEmpty()) {
			lotStatusRepository.saveAll(Arrays.asList(LotStatus.builder().lotStatus(ELotStatus.IN_PROCESSING).build(),
					LotStatus.builder().lotStatus(ELotStatus.REFUSED).build(),
					LotStatus.builder().lotStatus(ELotStatus.SOLD).build(),
					LotStatus.builder().lotStatus(ELotStatus.VALIDATED).build()));
		}

		if (roleRepository.findAll().isEmpty()) {
			roleRepository.saveAll(Arrays.asList(Role.builder().role(ERole.ROLE_ADMIN).build(),
					Role.builder().role(ERole.ROLE_MANAGER).build(), Role.builder().role(ERole.ROLE_USER).build()));
		}

		if (!userRepository.findByRoleRole(ERole.ROLE_ADMIN).iterator().hasNext()) {
			userRepository.save(User.builder().email("admin@admin.com").name("Валерия").surname("Ерофеева").status(true)
					.role(roleRepository.findByRole(ERole.ROLE_ADMIN)
							.orElseThrow(() -> new NotFoundException("Роль администратора не найдена!")))
					.lastname("Александровна").password(passwordEncoder.encode("admin")).phone("80291968250")
					.passportNumber("MP1234567").build());
		}

		if (!userRepository.findByRoleRole(ERole.ROLE_MANAGER).iterator().hasNext()) {
			userRepository
					.save(User.builder().email("manager1@manager.com").name("Виктор").surname("Иванов").status(true)
							.role(roleRepository.findByRole(ERole.ROLE_MANAGER)
									.orElseThrow(() -> new NotFoundException("Роль менеджера не найдена!")))
							.lastname("Иванович").password(passwordEncoder.encode("manager")).phone("80296466778")
							.passportNumber("MP3456789").build());
			userRepository
					.save(User.builder().email("manager2@manager.com").name("Владимир").surname("Николаев").status(true)
							.role(roleRepository.findByRole(ERole.ROLE_MANAGER)
									.orElseThrow(() -> new NotFoundException("Роль менеджера не найдена!")))
							.lastname("Николаевич").password(passwordEncoder.encode("manager")).phone("80296466766")
							.passportNumber("MP3454459").build());
		}

		if (!userRepository.findByRoleRole(ERole.ROLE_USER).iterator().hasNext()) {
			userRepository.save(User.builder().email("user1@user.com").name("Алиса").surname("Волкова").status(true)
					.role(roleRepository.findByRole(ERole.ROLE_USER)
							.orElseThrow(() -> new NotFoundException("Роль пользователя не найдена!")))
					.lastname("Владимировна").password(passwordEncoder.encode("user")).phone("80296666778")
					.passportNumber("MP3455789").build());
			userRepository.save(User.builder().email("user2@user.com").name("Елизавета").surname("Егорова").status(true)
					.role(roleRepository.findByRole(ERole.ROLE_USER)
							.orElseThrow(() -> new NotFoundException("Роль пользователя не найдена!")))
					.lastname("Игоревна").password(passwordEncoder.encode("user")).phone("80296766766")
					.passportNumber("MP2454459").build());
		}

		if (lotRepository.findAll().isEmpty()) {
			lotRepository.saveAll(Arrays.asList(
					Lot.builder()
							.car(Car.builder().name("TESLA").model("Model S").vinNumber("5YJSA1DP0CFS00739")
									.yearOfManufacture(2012).odometer(95546).primaryDamage("Cерьезные повреждения")
									.preAccidentValue(56566.50).color("Белый").drive("Полный привод").hasKeys(true)
									.highlights("Заводится и едет").batteryCapacity(100).power(544).powerReserve(656)
									.files(Arrays.asList(
											File.builder().name("tesla1.jpeg").size(10L)
													.uri("http://localhost:8080/images/tesla1.jpeg").build(),
											File.builder().name("tesla2.jpeg").size(10L)
													.uri("http://localhost:8080/images/tesla2.jpeg").build(),
											File.builder().name("tesla3.jpeg").size(10L)
													.uri("http://localhost:8080/images/tesla3.jpeg").build()))
									.build())
							.manager(userRepository.findById(1L)
									.orElseThrow(() -> new NotFoundException("Менеджер с id 1 не найден!")))
							.minBid(1000D).maxBid(25000D).createDateTime(LocalDateTime.now())
							.status(lotStatusRepository.findByLotStatus(ELotStatus.IN_PROCESSING)
									.orElseThrow(() -> new NotFoundException("Статус 'in proccessing' не найдена!")))
							.build(),
					Lot.builder()
							.car(Car.builder().name("BYD").model("Seal flagship").vinNumber("5YJSA1H43FF081072")
									.yearOfManufacture(2020).odometer(17650).primaryDamage("Минимальные повреждения")
									.preAccidentValue(56000.50).color("Черный").drive("Полный привод").hasKeys(true)
									.highlights("Заводится и едет").batteryCapacity(130).power(550).powerReserve(700)
									.files(Arrays.asList(
											File.builder().name("byd1.jpeg").size(10L)
													.uri("http://localhost:8080/images/byd1.jpeg").build(),
											File.builder().name("byd2.jpeg").size(10L)
													.uri("http://localhost:8080/images/byd2.jpeg").build(),
											File.builder().name("byd3.jpeg").size(10L)
													.uri("http://localhost:8080/images/byd3.jpeg").build()))
									.build())
							.manager(userRepository.findById(1L)
									.orElseThrow(() -> new NotFoundException("Менеджер с id 1 не найден!")))
							.minBid(10000D).maxBid(50000D).createDateTime(LocalDateTime.now())
							.status(lotStatusRepository.findByLotStatus(ELotStatus.IN_PROCESSING)
									.orElseThrow(() -> new NotFoundException("Статус 'in proccessing' не найдена!")))
							.build(),
					Lot.builder()
							.car(Car.builder().name("Li").model("L7 Max").vinNumber("JF2SJAWC8FH508273")
									.yearOfManufacture(2023).odometer(3100).primaryDamage("Без повреждений")
									.preAccidentValue(66100.50).color("Черный").drive("Полный привод").hasKeys(true)
									.highlights("Заводится и едет").batteryCapacity(120).power(664).powerReserve(656)
									.files(Arrays.asList(
											File.builder().name("li1.jpeg").size(10L)
													.uri("http://localhost:8080/images/li1.jpeg").build(),
											File.builder().name("li2.jpeg").size(10L)
													.uri("http://localhost:8080/images/li2.jpeg").build(),
											File.builder().name("li3.jpeg").size(10L)
													.uri("http://localhost:8080/images/li3.jpeg").build()))
									.build())
							.manager(userRepository.findById(1L)
									.orElseThrow(() -> new NotFoundException("Менеджер с id 1 не найден!")))
							.minBid(1000D).maxBid(25000D).createDateTime(LocalDateTime.now())
							.status(lotStatusRepository.findByLotStatus(ELotStatus.IN_PROCESSING)
									.orElseThrow(() -> new NotFoundException("Статус 'in proccessing' не найдена!")))
							.build(),
					Lot.builder()
							.car(Car.builder().name("Toyota").model("BZ4X").vinNumber("JF2SHACC1DH430061")
									.yearOfManufacture(2022).odometer(7450).primaryDamage("Без повреждений")
									.preAccidentValue(36600.00).color("Серый").drive("Полный привод").hasKeys(true)
									.highlights("Заводится и едет").batteryCapacity(100).power(500).powerReserve(500)
									.files(Arrays.asList(
											File.builder().name("toyota1.jpeg").size(10L)
													.uri("http://localhost:8080/images/toyota1.jpeg").build(),
											File.builder().name("toyota2.jpeg").size(10L)
													.uri("http://localhost:8080/images/toyota2.jpeg").build(),
											File.builder().name("toyota3.jpeg").size(10L)
													.uri("http://localhost:8080/images/toyota3.jpeg").build()))
									.build())
							.manager(userRepository.findById(2L)
									.orElseThrow(() -> new NotFoundException("Менеджер с id 1 не найден!")))
							.minBid(1000D).maxBid(25000D).createDateTime(LocalDateTime.now())
							.status(lotStatusRepository.findByLotStatus(ELotStatus.IN_PROCESSING)
									.orElseThrow(() -> new NotFoundException("Статус 'in proccessing' не найдена!")))
							.build(),
					Lot.builder()
							.car(Car.builder().name("Volkswagen").model("ID.6 CROZZ").vinNumber("JF1BC6745PG601617")
									.yearOfManufacture(2023).odometer(546).primaryDamage("Без повреждений")
									.preAccidentValue(41000.50).color("Белый").drive("Полный привод").hasKeys(true)
									.highlights("Заводится и едет").batteryCapacity(130).power(584).powerReserve(600)
									.files(Arrays.asList(
											File.builder().name("vw1.jpeg").size(10L)
													.uri("http://localhost:8080/images/vw1.jpeg").build(),
											File.builder().name("vw2.jpeg").size(10L)
													.uri("http://localhost:8080/images/vw2.jpeg").build(),
											File.builder().name("vw3.jpeg").size(10L)
													.uri("http://localhost:8080/images/vw3.jpeg").build()))
									.build())
							.manager(userRepository.findById(2L)
									.orElseThrow(() -> new NotFoundException("Менеджер с id 1 не найден!")))
							.minBid(5000D).maxBid(41000D).createDateTime(LocalDateTime.now())
							.status(lotStatusRepository.findByLotStatus(ELotStatus.IN_PROCESSING)
									.orElseThrow(() -> new NotFoundException("Статус 'in proccessing' не найдена!")))
							.build()));
		}

	}
}
