package com.valery.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CarDTO {
	
	@NotBlank
	private String name;

	@NotBlank
	private String model;

	@NotNull
	private String vinNumber;

	@NotNull
	private Integer odometer;

	@NotNull
	private Integer yearOfManufacture;

	@NotBlank
	private String primaryDamage;

	@NotNull
	private Double preAccidentValue;

	@NotBlank
	private String color;

	@NotBlank
	private String drive;
	
	@NotBlank
	private String highlights;

	@NotNull
	private Boolean hasKeys;
	
	@NotNull
	private Integer powerReserve;
	
	@NotNull
	private Integer batteryCapacity;
	
	@NotNull
	private Integer power;
	
}
