package com.valery.services;

import com.valery.entities.Lot;
import com.valery.exceptions.NotFoundException;

public interface LotService {
	Lot getLotById(Long id) throws NotFoundException;

	Iterable<Lot> getAllLots();
	
	Iterable<Lot> getAllValidatedLots();

	Iterable<Lot> getNewLots();
}
