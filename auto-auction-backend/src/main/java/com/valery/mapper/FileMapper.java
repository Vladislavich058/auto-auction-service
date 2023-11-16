package com.valery.mapper;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;

import com.valery.dtos.FileDTO;
import com.valery.entities.File;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.FIELD)
public interface FileMapper {
	FileDTO toFileDTO(File file);

	File toFile(FileDTO fileDTO);
}
