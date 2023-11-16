package com.valery.services;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.MalformedURLException;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import com.valery.entities.File;


public interface FileService {
	File uploadFile(MultipartFile file) throws IOException;
	Resource getFile(String fileName) throws FileNotFoundException, MalformedURLException;
}
