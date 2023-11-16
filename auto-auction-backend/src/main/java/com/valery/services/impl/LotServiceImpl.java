package com.valery.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.valery.entities.Lot;
import com.valery.exceptions.NotFoundException;
import com.valery.repositories.LotRepository;
import com.valery.services.LotService;

@Service
public class LotServiceImpl implements LotService {

	@Autowired
	LotRepository lotRepository;

	@Override
	public Lot getLotById(Long id) throws NotFoundException {
		return lotRepository.findById(id).orElseThrow(() -> new NotFoundException("Лот с id " + id + " не найден!"));
	}

	@Override
	public Iterable<Lot> getAllLots() {
		return lotRepository.findAll();
	}

	@Override
	public Iterable<Lot> getNewLots() {
		return lotRepository.findAllOrderByCreateDateTimeAsc();
	}

}
