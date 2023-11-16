package com.valery.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.valery.entities.ELotStatus;
import com.valery.entities.Lot;

@RepositoryRestResource(exported = false)
public interface LotRepository extends JpaRepository<Lot, Long> {
	Iterable<Lot> findByManagerId(Long id);

//	@Query(value = "SELECT * FROM lots INNER JOIN lot_statuses ON lot_statuses.id=lots.status_id WHERE lot_status LIKE 'VALIDATED' ORDER BY create_date_time DESC LIMIT 3", nativeQuery = true)
//	Iterable<Lot> findAllOrderByCreateDateTimeAsc();

	Iterable<Lot> findFirst3ByStatusLotStatusOrderByCreateDateTimeDesc(ELotStatus eLotStatus);

	Iterable<Lot> findByStatusLotStatus(ELotStatus eLotStatus);
}
