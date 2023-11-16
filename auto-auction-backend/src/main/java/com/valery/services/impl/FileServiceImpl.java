package com.valery.services.impl;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.valery.entities.File;
import com.valery.exceptions.FileNotSupportedException;
import com.valery.services.FileService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class FileServiceImpl implements FileService {

	@Value("${project.image}")
	private String path;

	@Override
	public File uploadFile(MultipartFile file) throws IOException {
		Path UPLOAD_PATH = Paths.get(path);

		if (!Files.exists(UPLOAD_PATH)) {
			Files.createDirectories(UPLOAD_PATH);
		}

		if (!file.getContentType().equals("image/jpeg") && !file.getContentType().equals("image/png") && !file.getContentType().equals("image/jpg")) {
			throw new FileNotSupportedException("Только .jpeg, .png, .jpg изображения поддерживаются");
		}

		String fileName = file.getOriginalFilename();
		String uniqueFileName = UUID.randomUUID().toString().concat(fileName.substring(fileName.lastIndexOf(".")));

		Path filePath = UPLOAD_PATH.resolve(uniqueFileName);

		Files.copy(file.getInputStream(), filePath);

		String fileUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/images/").path(uniqueFileName)
				.toUriString();

		return File.builder().name(uniqueFileName).uri(fileUri).size(file.getSize()).build();

	}

	@Override
	public Resource getFile(String fileName) throws FileNotFoundException, MalformedURLException {
		Resource resource = new UrlResource("file:" + path + fileName);
		if (resource.exists()) {
			return resource;
		} else {
			throw new FileNotFoundException("Файл не найден " + fileName);
		}
	}

}
