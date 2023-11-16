package com.valery.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class FileDTO {
	
	@NotBlank
	private String name;
	
	@NotBlank
	private Long size;
}
