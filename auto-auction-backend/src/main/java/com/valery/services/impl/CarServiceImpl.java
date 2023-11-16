package com.valery.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.valery.entities.Car;
import com.valery.repositories.CarRepository;
import com.valery.services.CarService;

@Service
public class CarServiceImpl implements CarService {
	
	@Autowired
	private CarRepository carRepository;

	@Override
	public Iterable<Car> getAllCars() {
		return carRepository.findAll();
	}

}
