package com.valery.mapper;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;

import com.valery.dtos.UserDTO;
import com.valery.entities.User;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.FIELD)
public interface UserMapper {
	User toUser(UserDTO userDTO);

	UserDTO toUserDTO(User user);
}
