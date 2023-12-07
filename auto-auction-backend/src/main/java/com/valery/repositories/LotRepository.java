package com.valery.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.valery.entities.ELotStatus;
import com.valery.entities.Lot;

@RepositoryRestResource(exported = false)
public interface LotRepository extends JpaRepository<Lot, Long> {
	Iterable<Lot> findByManagerId(Long id);

	@Query(value = "SELECT lots.* \n" + "FROM lots \n" + "INNER JOIN lot_statuses ON lot_statuses.id=lots.status_id \n"
			+ "INNER JOIN cars ON cars.id=lots.car_id \n"
			+ "WHERE lot_status LIKE 'VALIDATED' and primary_damage LIKE 'Без повреждений' \n"
			+ "ORDER BY (SELECT MAX(bid_cost) \n" + "			FROM bids\n"
			+ "            INNER JOIN lots ON lots.id=bids.lot_id) DESC \n" + "LIMIT 3\n" + "", nativeQuery = true)
	Iterable<Lot> findTopLots();

	Iterable<Lot> findByStatusLotStatus(ELotStatus eLotStatus);

	Iterable<Lot> findByBidsClientId(Long id);

	Optional<Lot> findByBidsClientIdAndIdAndStatusLotStatusIn(Long clientId, Long id,
			Iterable<ELotStatus> eLotStatuses);

	Optional<Lot> findByStatusLotStatusAndId(ELotStatus eLotStatus, Long id);

	Optional<Lot> findByIdAndManagerId(Long lotId, Long managerId);
}
