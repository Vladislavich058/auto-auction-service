package com.valery.exceptions;

public class NotFoundException extends Exception {

	private static final long serialVersionUID = -1041705195726031336L;

	public NotFoundException(String mes) {
		super(mes);
	}
}
