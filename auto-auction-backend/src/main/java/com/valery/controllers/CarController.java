package com.valery.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.valery.entities.Car;
import com.valery.services.CarService;

@RestController
@RequestMapping("/api/cars")
public class CarController {
	
	@Autowired
	private CarService service;
	
	@GetMapping
	public Iterable<Car> getAllCars() {
		return service.getAllCars();
	}
}
