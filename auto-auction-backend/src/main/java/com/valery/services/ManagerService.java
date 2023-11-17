package com.valery.services;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.valery.dtos.LotDTO;
import com.valery.dtos.SaleBidDTO;
import com.valery.entities.Lot;
import com.valery.entities.User;
import com.valery.exceptions.CarAlreadyExistsException;
import com.valery.exceptions.NotFoundException;

import jakarta.transaction.Transactional;

public interface ManagerService {
	Iterable<Lot> getLots(User user);

	Lot getLotById(User user, Long id) throws NotFoundException;

	@Transactional
	Lot addLot(User user, LotDTO lotDTO, MultipartFile[] files)
			throws CarAlreadyExistsException, NotFoundException, IOException;

	Lot saleLot(Long id, SaleBidDTO saleBidDTO) throws NotFoundException;
}
