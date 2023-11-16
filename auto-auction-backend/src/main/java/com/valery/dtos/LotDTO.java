package com.valery.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LotDTO {
	
	@NotNull
	private CarDTO car;
	
	@NotNull
	private Double maxBid;
	
	@NotNull
	private Double minBid;
}
