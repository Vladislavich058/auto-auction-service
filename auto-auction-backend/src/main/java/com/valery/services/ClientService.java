package com.valery.services;

import com.valery.dtos.BidDTO;
import com.valery.entities.Lot;
import com.valery.entities.User;
import com.valery.exceptions.NotFoundException;

public interface ClientService {
	Iterable<Lot> getLots(User user);
	
	Lot getLotById(User user, Long id) throws NotFoundException;

	Lot addBid(User user, Long id, BidDTO bidDTO) throws NotFoundException;
}
