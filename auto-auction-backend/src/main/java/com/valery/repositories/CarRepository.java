package com.valery.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.valery.entities.Car;

@RepositoryRestResource
public interface CarRepository extends JpaRepository<Car, Long> {
	Optional<Car> findByVinNumber(String vinNumber);
}
