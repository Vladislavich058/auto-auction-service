package com.valery.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.valery.dtos.UserDTO;
import com.valery.entities.ELotStatus;
import com.valery.entities.ERole;
import com.valery.entities.Lot;
import com.valery.entities.User;
import com.valery.exceptions.NotFoundException;
import com.valery.exceptions.UserAlreadyExistsException;
import com.valery.mapper.UserMapper;
import com.valery.repositories.LotRepository;
import com.valery.repositories.LotStatusRepository;
import com.valery.repositories.RoleRepository;
import com.valery.repositories.UserRepository;
import com.valery.services.AdminService;

@Service
public class AdminServiceImpl implements AdminService {

	@Autowired
	UserRepository userRepository;

	@Autowired
	UserMapper userMapper;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	LotRepository lotRepository;

	@Autowired
	LotStatusRepository lotStatusRepository;

	@Override
	public Iterable<User> getAllManagers() {
		return userRepository.findByRoleRole(ERole.ROLE_MANAGER);
	}

	@Override
	public Iterable<User> getAllClients() {
		return userRepository.findByRoleRole(ERole.ROLE_USER);
	}

	@Override
	public Page<User> getManagers(Integer page, Integer limit) {
		return userRepository.findByRoleRole(ERole.ROLE_MANAGER, PageRequest.of(page, limit));
	}

	@Override
	public Page<User> getClients(Integer page, Integer limit) {
		return userRepository.findByRoleRole(ERole.ROLE_USER, PageRequest.of(page, limit));
	}

	@Override
	public Long changeUserStatusById(Long id) throws NotFoundException {
		User blockUser = userRepository.findById(id)
				.orElseThrow(() -> new NotFoundException("Пользователь с id " + id + " не найден!"));
		blockUser.setStatus(!blockUser.getStatus());
		userRepository.save(blockUser);

		return id;
	}

	@Override
	public Long deleteUserById(Long id) throws NotFoundException {
		userRepository.findById(id).orElseThrow(() -> new NotFoundException("Пользователь с id " + id + " не найден!"));
		userRepository.deleteById(id);

		return id;
	}

	@Override
	public User addManager(UserDTO userDTO) throws NotFoundException, UserAlreadyExistsException {
		if (userRepository.findByEmail(userDTO.getEmail()).isPresent()) {
			throw new UserAlreadyExistsException(
					"Пользователь с таким email " + userDTO.getEmail() + " уже существует!");
		}

		User newManager = userMapper.toUser(userDTO);
		newManager.setPassword(encoder.encode(userDTO.getPassword()));
		newManager.setRole(roleRepository.findByRole(ERole.ROLE_MANAGER)
				.orElseThrow(() -> new NotFoundException("Роль менеджера не найдена!")));
		newManager.setStatus(true);

		return userRepository.save(newManager);
	}

	@Override
	public Long approveLot(Long id) throws NotFoundException {
		Lot lot = lotRepository.findById(id).orElseThrow(() -> new NotFoundException("Лот с id " + id + " не найден!"));
		lot.setStatus(lotStatusRepository.findByLotStatus(ELotStatus.VALIDATED)
				.orElseThrow(() -> new NotFoundException("Статус лота 'validated' не найден!")));
		return lotRepository.save(lot).getId();
	}

	@Override
	public Long refuseLot(Long id) throws NotFoundException {
		Lot lot = lotRepository.findById(id).orElseThrow(() -> new NotFoundException("Лот с id " + id + " не найден!"));
		lot.setStatus(lotStatusRepository.findByLotStatus(ELotStatus.REFUSED)
				.orElseThrow(() -> new NotFoundException("Статус лота 'refused' не найден!")));
		return lotRepository.save(lot).getId();
	}

	@Override
	public Iterable<Lot> getAllLots() {
		return lotRepository.findAll();
	}

	@Override
	public Lot getLotById(Long id) throws NotFoundException {
		return lotRepository.findById(id).orElseThrow(() -> new NotFoundException("Лот с id " + id + " не найден!"));
	}

}
