package com.valery.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.valery.entities.File;

@RepositoryRestResource(exported = false)
public interface FileRepository extends JpaRepository<File, Long>{

}
