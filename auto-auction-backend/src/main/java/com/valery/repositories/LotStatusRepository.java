package com.valery.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.valery.entities.ELotStatus;
import com.valery.entities.LotStatus;

@RepositoryRestResource(exported = false)
public interface LotStatusRepository extends JpaRepository<LotStatus, Long> {
	Optional<LotStatus> findByLotStatus(ELotStatus lotStatus);
}
