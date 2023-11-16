package com.valery.exceptions;

public class CarAlreadyExistsException extends Exception {

	private static final long serialVersionUID = -2345444386070381559L;

	public CarAlreadyExistsException(String error) {
		super(error);
	}
}
