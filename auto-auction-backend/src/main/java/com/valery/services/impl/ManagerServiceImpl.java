package com.valery.services.impl;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.valery.dtos.LotDTO;
import com.valery.dtos.SaleBidDTO;
import com.valery.entities.Bid;
import com.valery.entities.ELotStatus;
import com.valery.entities.File;
import com.valery.entities.Lot;
import com.valery.entities.User;
import com.valery.exceptions.CarAlreadyExistsException;
import com.valery.exceptions.NotFoundException;
import com.valery.mapper.CarMapper;
import com.valery.mapper.LotMapper;
import com.valery.repositories.CarRepository;
import com.valery.repositories.LotRepository;
import com.valery.repositories.LotStatusRepository;
import com.valery.repositories.UserRepository;
import com.valery.services.FileService;
import com.valery.services.ManagerService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ManagerServiceImpl implements ManagerService {

	@Autowired
	LotRepository lotRepository;

	@Autowired
	CarRepository carRepository;

	@Autowired
	FileService fileService;

	@Autowired
	LotMapper lotMapper;

	@Autowired
	CarMapper carMapper;

	@Autowired
	LotStatusRepository lotStatusRepository;

	@Autowired
	UserRepository userRepository;

	@Override
	public Lot addLot(User user, LotDTO lotDTO, MultipartFile[] files)
			throws CarAlreadyExistsException, NotFoundException, IOException {
		if (carRepository.findByVinNumber(lotDTO.getCar().getVinNumber()).isPresent()) {
			throw new CarAlreadyExistsException(
					"Автомобиль с таким VIN кузова " + lotDTO.getCar().getVinNumber() + " уже существует");
		}
		List<File> photos = new ArrayList<>();
		for (MultipartFile file : files) {
			photos.add(fileService.uploadFile(file));
		}

		Lot newLot = lotMapper.toLot(lotDTO);
		newLot.setManager(userRepository.findById(user.getId())
				.orElseThrow(() -> new NotFoundException("Пользователь с id " + user.getId() + " не найден!")));
		newLot.setCreateDateTime(LocalDateTime.now());
		newLot.setStatus(lotStatusRepository.findByLotStatus(ELotStatus.IN_PROCESSING)
				.orElseThrow(() -> new NotFoundException("Роль 'в процессе' не найдена")));
		newLot.getCar().setFiles(photos);

		return lotRepository.save(newLot);
	}

	@Override
	public Iterable<Lot> getLots(User user) {
		return lotRepository.findByManagerId(user.getId());
	}

	@Override
	public Lot getLotById(User user, Long id) throws NotFoundException {
		return lotRepository.findByIdAndManagerId(id, user.getId())
				.orElseThrow(() -> new NotFoundException("Лот с id " + id + " не найден!"));
	}

	@Override
	public Lot saleLot(Long id, SaleBidDTO saleBidDTO) throws NotFoundException {
		User client = userRepository.findById(saleBidDTO.clientId())
				.orElseThrow(() -> new NotFoundException("Пользователь с id " + saleBidDTO.clientId() + " не найден!"));
		Lot lot = lotRepository.findById(id).orElseThrow(() -> new NotFoundException("Лот с id " + id + " не найден!"));
		lot.setSoldBid(saleBidDTO.bid());
		lot.setClient(client);
		lot.setCloseDateTime(LocalDateTime.now());
		lot.setStatus(lotStatusRepository.findByLotStatus(ELotStatus.SOLD)
				.orElseThrow(() -> new NotFoundException("Статус 'sold' не найден!")));
		return lotRepository.save(lot);
	}

}
