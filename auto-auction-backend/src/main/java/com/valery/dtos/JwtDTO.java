package com.valery.dtos;

public record JwtDTO(String accessToken, String type, Long id, String email, String role) {

}
