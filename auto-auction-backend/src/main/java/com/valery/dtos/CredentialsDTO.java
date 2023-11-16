package com.valery.dtos;

import jakarta.validation.constraints.NotNull;

public record CredentialsDTO(@NotNull String email, @NotNull String password) {
}
