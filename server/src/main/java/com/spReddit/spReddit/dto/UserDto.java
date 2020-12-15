package com.spReddit.spReddit.dto;

import com.spReddit.spReddit.model.UserEntity;

import java.io.Serializable;

public class UserDto implements Serializable {

    private long id;
    private String username;

    public UserDto(UserEntity userEntity) {
        this.id = userEntity.getId();
        this.username = userEntity.getUsername();
    }
}
