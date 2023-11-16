package com.valery.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserDTO {
	
	@NotBlank
	@Size(min = 5)
	private String email;

	@NotBlank
	@Size(min = 5)
	private String password;

	@NotBlank
	@Pattern(regexp = "^[A-Za-zА-Яа-яЁё]+$")
	private String name;

	@NotBlank
	@Pattern(regexp = "^[A-Za-zА-Яа-яЁё]+$")
	private String surname;

	private String lastname;

	@NotBlank
	@Pattern(regexp = "^(80|\\+375)(\\(?(29|44|25|33)\\)?)[\\d]{7}$")
	private String phone;
	
	@NotBlank
	@Pattern(regexp = "^(AB|BM|HB|KH|MP|MC|KB|PP|SP|DP)[\\d]{7}$")
	private String passportNumber;
}
