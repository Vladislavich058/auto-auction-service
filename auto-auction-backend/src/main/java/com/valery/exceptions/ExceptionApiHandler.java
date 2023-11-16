package com.valery.exceptions;

import java.io.IOException;

import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.valery.dtos.ErrorMessage;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class ExceptionApiHandler {

	@ExceptionHandler(UserAlreadyExistsException.class)
	public ResponseEntity<ErrorMessage> userAlreadyExistsException(UserAlreadyExistsException exception) {
		log.error(exception.getMessage());
		return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorMessage(exception.getMessage()));
	}

	@ExceptionHandler(UsernameNotFoundException.class)
	public ResponseEntity<ErrorMessage> usernameNotFoundException(UsernameNotFoundException exception) {
		log.error(exception.getMessage());
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorMessage(exception.getMessage()));
	}

	@ExceptionHandler(NotFoundException.class)
	public ResponseEntity<ErrorMessage> notFoundException(NotFoundException exception) {
		log.error(exception.getMessage());
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorMessage(exception.getMessage()));
	}

	@ExceptionHandler(BadCredentialsException.class)
	public ResponseEntity<ErrorMessage> badCredentialsException(BadCredentialsException exception) {
		log.error(exception.getMessage());
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorMessage("Неверные данные!"));
	}

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ErrorMessage> resourceNotFoundException(ResourceNotFoundException exception) {
		log.error(exception.getMessage());
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorMessage("Endpoint не найден!"));
	}

	@ExceptionHandler(FileNotSupportedException.class)
	public ResponseEntity<ErrorMessage> fileNotSupportedException(FileNotSupportedException exception) {
		log.error(exception.getMessage());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorMessage(exception.getMessage()));
	}

	@ExceptionHandler(CarAlreadyExistsException.class)
	public ResponseEntity<ErrorMessage> carAlreadyExistsException(CarAlreadyExistsException exception) {
		log.error(exception.getMessage());
		return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorMessage(exception.getMessage()));
	}
	
	@ExceptionHandler(IOException.class)
	public ResponseEntity<ErrorMessage> iOException(IOException exception) {
		log.error(exception.getMessage());
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorMessage(exception.getMessage()));
	}

}
