package com.valery.services;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.valery.dtos.LotDTO;
import com.valery.entities.Lot;
import com.valery.entities.User;
import com.valery.exceptions.CarAlreadyExistsException;
import com.valery.exceptions.NotFoundException;

import jakarta.transaction.Transactional;

public interface ManagerService {
	Iterable<Lot> getLots(Long id);

	@Transactional
	Lot addLot(User user, LotDTO lotDTO, MultipartFile[] files)
			throws CarAlreadyExistsException, NotFoundException, IOException;
}
