package com.valery.controllers;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.valery.dtos.LotDTO;
import com.valery.entities.Lot;
import com.valery.entities.User;
import com.valery.exceptions.CarAlreadyExistsException;
import com.valery.exceptions.NotFoundException;
import com.valery.services.ManagerService;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/manager")
public class ManagerController {

	@Autowired
	ManagerService managerService;

	@GetMapping("/getLots")
	public Iterable<Lot> getLots(@AuthenticationPrincipal User user) {
		return managerService.getLots(user.getId());
	}

	@PostMapping("/addLot")
	public Lot addLot(@AuthenticationPrincipal User user, @Valid @RequestPart("lot") LotDTO lotDTO,
			@RequestPart("files") MultipartFile[] files)
			throws CarAlreadyExistsException, NotFoundException, IOException {
		return managerService.addLot(user, lotDTO, files);
	}
}
