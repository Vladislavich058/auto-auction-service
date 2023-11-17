package com.valery.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.valery.dtos.UserDTO;
import com.valery.entities.Lot;
import com.valery.entities.User;
import com.valery.exceptions.NotFoundException;
import com.valery.exceptions.UserAlreadyExistsException;
import com.valery.services.AdminService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
	@Autowired
	AdminService adminService;

	@GetMapping("/getManagers")
	public Page<User> getManagers(@RequestParam("page") Integer page, @RequestParam("limit") Integer limit) {
		return adminService.getManagers(page, limit);
	}

	@GetMapping("/getAllManagers")
	public Iterable<User> getAllManagers() {
		return adminService.getAllManagers();
	}

	@GetMapping("/getAllClients")
	public Iterable<User> getAllClients() {
		return adminService.getAllClients();
	}

	@GetMapping("/changeUserStatusById/{id}")
	public Long changeUserStatusById(@PathVariable Long id) throws NotFoundException {
		return adminService.changeUserStatusById(id);
	}

	@DeleteMapping("/deleteUserById/{id}")
	public Long deleteUserById(@PathVariable Long id) throws NotFoundException {
		return adminService.deleteUserById(id);
	}

	@PostMapping("/addManager")
	public User addManager(@Valid @RequestBody UserDTO userDTO) throws NotFoundException, UserAlreadyExistsException {
		return adminService.addManager(userDTO);
	}

	@GetMapping("/getAllLots")
	public Iterable<Lot> getAllLots() {
		return adminService.getAllLots();
	}

	@GetMapping("/getLotById/{id}")
	public Lot getLotById(@PathVariable("id") Long id) throws NotFoundException {
		return adminService.getLotById(id);
	}

	@GetMapping("/approveLotById/{id}")
	public Long approveLotById(@PathVariable Long id) throws NotFoundException {
		return adminService.approveLot(id);
	}

	@GetMapping("/refuseLotById/{id}")
	public Long refuseLotById(@PathVariable Long id) throws NotFoundException {
		return adminService.refuseLot(id);
	}
}
