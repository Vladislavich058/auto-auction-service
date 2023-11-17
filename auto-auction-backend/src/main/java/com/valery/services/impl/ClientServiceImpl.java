package com.valery.services.impl;

import java.time.LocalDateTime;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.valery.dtos.BidDTO;
import com.valery.entities.Bid;
import com.valery.entities.ELotStatus;
import com.valery.entities.Lot;
import com.valery.entities.User;
import com.valery.exceptions.NotFoundException;
import com.valery.repositories.LotRepository;
import com.valery.repositories.LotStatusRepository;
import com.valery.repositories.UserRepository;
import com.valery.services.ClientService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ClientServiceImpl implements ClientService {

	@Autowired
	UserRepository userRepository;

	@Autowired
	LotRepository lotRepository;

	@Autowired
	LotStatusRepository lotStatusRepository;

	@Override
	public Lot addBid(User user, Long id, BidDTO bidDTO) throws NotFoundException {
		User client = userRepository.findById(user.getId())
				.orElseThrow(() -> new NotFoundException("Пользователь с id " + user.getId() + " не найден!"));
		Lot lot = lotRepository.findById(id).orElseThrow(() -> new NotFoundException("Лот с id " + id + " не найден!"));
		lot.getBids().add(
				Bid.builder().bidCost(bidDTO.value()).bidDateTime(LocalDateTime.now()).client(client).lot(lot).build());
		if (bidDTO.value().equals(lot.getMaxBid())) {
			lot.setSoldBid(bidDTO.value());
			lot.setClient(client);
			lot.setCloseDateTime(LocalDateTime.now());
			lot.setStatus(lotStatusRepository.findByLotStatus(ELotStatus.SOLD)
					.orElseThrow(() -> new NotFoundException("Статус 'sold' не найден!")));
		}
		return lotRepository.save(lot);
	}

	@Override
	public Iterable<Lot> getLots(User user) {
		return lotRepository.findByBidsClientId(user.getId());
	}

	@Override
	public Lot getLotById(User user, Long id) throws NotFoundException {
		return lotRepository
				.findByBidsClientIdAndIdAndStatusLotStatusIn(user.getId(), id,
						Arrays.asList(ELotStatus.SOLD, ELotStatus.VALIDATED))
				.orElseThrow(() -> new NotFoundException("Лот с id " + id + " не найден!"));
	}

}
