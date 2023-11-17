package com.valery.services;

import org.springframework.data.domain.Page;

import com.valery.dtos.UserDTO;
import com.valery.entities.Lot;
import com.valery.entities.User;
import com.valery.exceptions.NotFoundException;
import com.valery.exceptions.UserAlreadyExistsException;

public interface AdminService {
	Page<User> getManagers(Integer page, Integer limit);

	Page<User> getClients(Integer page, Integer limit);
	
	Iterable<User> getAllManagers();

	Iterable<User> getAllClients();

	Long changeUserStatusById(Long id) throws NotFoundException;

	Long deleteUserById(Long id) throws NotFoundException;
	
	User addManager(UserDTO userDTO) throws NotFoundException, UserAlreadyExistsException;
	
	Long approveLot(Long id) throws NotFoundException;
	
	Long refuseLot(Long id) throws NotFoundException;
	
	Iterable<Lot> getAllLots();
	
	Lot getLotById(Long id) throws NotFoundException;
}
