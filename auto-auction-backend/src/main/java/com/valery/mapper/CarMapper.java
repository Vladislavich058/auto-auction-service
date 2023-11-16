package com.valery.mapper;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;

import com.valery.dtos.CarDTO;
import com.valery.entities.Car;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.FIELD)
public interface CarMapper {
	Car toCar(CarDTO carDTO);
}
