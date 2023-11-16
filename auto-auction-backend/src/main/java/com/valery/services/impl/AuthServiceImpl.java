package com.valery.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.valery.dtos.CredentialsDTO;
import com.valery.dtos.JwtDTO;
import com.valery.dtos.UserDTO;
import com.valery.entities.ERole;
import com.valery.entities.User;
import com.valery.exceptions.NotFoundException;
import com.valery.exceptions.UserAlreadyExistsException;
import com.valery.mapper.UserMapper;
import com.valery.repositories.RoleRepository;
import com.valery.repositories.UserRepository;
import com.valery.security.jwt.JwtUtils;
import com.valery.services.AuthService;

@Service
public class AuthServiceImpl implements AuthService {

	@Autowired
	UserMapper userMapper;

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;

	@Override
	public JwtDTO authenticateUser(CredentialsDTO credentialsDTO) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(credentialsDTO.email(), credentialsDTO.password()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);

		User userDetails = (User) authentication.getPrincipal();
		String role = userDetails.getAuthorities().stream().map(item -> item.getAuthority()).findFirst().get();
		return new JwtDTO(jwt, "Bearer", userDetails.getId(), userDetails.getEmail(), role);
	}

	@Override
	public User registerUser(UserDTO userDTO) throws NotFoundException, UserAlreadyExistsException {

		if (userRepository.findByEmail(userDTO.getEmail()).isPresent()) {
			throw new UserAlreadyExistsException(
					"Пользователь с таким email " + userDTO.getEmail() + " уже существует!");
		}

		User user = userMapper.toUser(userDTO);
		user.setPassword(encoder.encode(userDTO.getPassword()));
		user.setRole(roleRepository.findByRole(ERole.ROLE_USER)
				.orElseThrow(() -> new NotFoundException("Роль пользователя не найдена!")));
		user.setStatus(true);

		return userRepository.save(user);

	}

	@Override
	public UserDTO getCurrentUser(User user) {
		return userMapper.toUserDTO(user);
	}

	@Override
	public JwtDTO updateCurrentUser(User user, UserDTO updateUserDTO) throws NotFoundException {
		User findUser = userRepository.findByEmail(user.getEmail()).orElseThrow(
				() -> new NotFoundException("Пользователь с таким email " + user.getEmail() + " не найден!"));
		if (!user.getEmail().equals(updateUserDTO.getEmail())) {
			userRepository.findByEmail(updateUserDTO.getEmail()).ifPresent(u -> new UserAlreadyExistsException(
					"Пользователь с таким email " + updateUserDTO.getEmail() + " уже существует!"));
		}
		findUser.setEmail(updateUserDTO.getEmail());
		findUser.setName(updateUserDTO.getName());
		findUser.setSurname(updateUserDTO.getSurname());
		findUser.setLastname(updateUserDTO.getLastname());
		findUser.setPassportNumber(updateUserDTO.getPassportNumber());
		findUser.setPhone(updateUserDTO.getPhone());
		findUser.setPassword(encoder.encode(updateUserDTO.getPassword()));
		userRepository.save(findUser);
		return authenticateUser(new CredentialsDTO(updateUserDTO.getEmail(), updateUserDTO.getPassword()));
	}

}
