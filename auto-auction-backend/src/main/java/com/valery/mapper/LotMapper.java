package com.valery.mapper;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;

import com.valery.dtos.LotDTO;
import com.valery.entities.Lot;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.FIELD, uses = { CarMapper.class })
public interface LotMapper {
	Lot toLot(LotDTO lotDTO);
}
