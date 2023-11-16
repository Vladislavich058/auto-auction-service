package com.valery.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.valery.entities.Bid;

@RepositoryRestResource(exported = false)
public interface BidRepository extends JpaRepository<Bid, Long> {

}
