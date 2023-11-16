package com.valery.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.valery.entities.NaturalClient;

@RepositoryRestResource
public interface NaturalClientRepository extends JpaRepository<NaturalClient, Long> {

}
