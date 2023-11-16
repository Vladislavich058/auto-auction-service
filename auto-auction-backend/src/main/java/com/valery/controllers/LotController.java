package com.valery.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.valery.entities.Lot;
import com.valery.exceptions.NotFoundException;
import com.valery.services.LotService;

@RestController
@RequestMapping("/api/lots")
public class LotController {

	@Autowired
	LotService lotService;

	@GetMapping("/getLotById/{id}")
	public Lot getLotById(@PathVariable("id") Long id) throws NotFoundException {
		return lotService.getLotById(id);
	}

	@GetMapping("/getAllLots")
	public Iterable<Lot> getAllLots() {
		return lotService.getAllLots();
	}

	@GetMapping("/getAllValidatedLots")
	public Iterable<Lot> getAllValidatedLots() {
		return lotService.getAllValidatedLots();
	}

	@GetMapping("/getNewLots")
	public Iterable<Lot> getNewLots() {
		return lotService.getNewLots();
	}
}
