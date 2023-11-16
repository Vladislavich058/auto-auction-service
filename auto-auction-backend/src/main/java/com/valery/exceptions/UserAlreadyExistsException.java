package com.valery.exceptions;

public class UserAlreadyExistsException extends Exception {
	private static final long serialVersionUID = 437698668348004399L;

	public UserAlreadyExistsException(String error) {
		super(error);
	}
}
