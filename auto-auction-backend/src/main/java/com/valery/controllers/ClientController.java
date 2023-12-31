package com.valery.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.valery.dtos.BidDTO;
import com.valery.entities.Lot;
import com.valery.entities.User;
import com.valery.exceptions.NotFoundException;
import com.valery.services.ClientService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/client")
public class ClientController {

	@Autowired
	ClientService clientService;

	@GetMapping("/getLots")
	public Iterable<Lot> getLots(@AuthenticationPrincipal User user) {
		return clientService.getLots(user);
	}

	@GetMapping("/getLotById/{id}")
	public Lot getLotById(@AuthenticationPrincipal User user, @PathVariable("id") Long id) throws NotFoundException {
		return clientService.getLotById(user, id);
	}

	@PutMapping("/addBid/{id}")
	public Lot addBid(@AuthenticationPrincipal User user, @Valid @RequestBody BidDTO bidDTO,
			@PathVariable("id") Long id) throws NotFoundException {
		return clientService.addBid(user, id, bidDTO);
	}

}
