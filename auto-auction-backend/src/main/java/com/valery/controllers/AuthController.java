package com.valery.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.valery.dtos.CredentialsDTO;
import com.valery.dtos.JwtDTO;
import com.valery.dtos.UserDTO;
import com.valery.entities.User;
import com.valery.exceptions.NotFoundException;
import com.valery.exceptions.UserAlreadyExistsException;
import com.valery.services.AuthService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired
	AuthService authService;

	@PostMapping("/login")
	public JwtDTO authenticateUser(@Valid @RequestBody CredentialsDTO credentialsDto) {

		return authService.authenticateUser(credentialsDto);
	}

	@PostMapping("/register")
	public User registerUser(@Valid @RequestBody UserDTO userDTO) throws NotFoundException, UserAlreadyExistsException {

		return authService.registerUser(userDTO);
	}

	@GetMapping("/getCurrentUser")
	public UserDTO getCurrentUser(@AuthenticationPrincipal User user) throws NotFoundException {
		return authService.getCurrentUser(user);
	}

	@PatchMapping("/updateCurrentUser")
	public JwtDTO updateCurrentUser(@AuthenticationPrincipal User user, @Valid @RequestBody UserDTO updateUserDTO)
			throws NotFoundException {

		return authService.updateCurrentUser(user, updateUserDTO);
	}
}
