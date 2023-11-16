package com.valery.services;

import com.valery.dtos.CredentialsDTO;
import com.valery.dtos.JwtDTO;
import com.valery.dtos.UserDTO;
import com.valery.entities.User;
import com.valery.exceptions.NotFoundException;
import com.valery.exceptions.UserAlreadyExistsException;

public interface AuthService {
	JwtDTO authenticateUser(CredentialsDTO credentialsDTO);

	User registerUser(UserDTO userDTO) throws NotFoundException, UserAlreadyExistsException;

	UserDTO getCurrentUser(User user);
	
	JwtDTO updateCurrentUser(User user, UserDTO updateUserDTO) throws NotFoundException;
}
