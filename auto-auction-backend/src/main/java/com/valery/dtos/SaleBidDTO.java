package com.valery.dtos;

import jakarta.validation.constraints.NotNull;

public record SaleBidDTO(@NotNull Long clientId, @NotNull Double bid) {

}
