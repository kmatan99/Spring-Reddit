package com.spReddit.spReddit.controller;

import com.spReddit.spReddit.dto.PostUserDto;
import com.spReddit.spReddit.model.UserEntity;
import com.spReddit.spReddit.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
    private UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping(value = "/createuser")
    ResponseEntity<String> createUser(@RequestBody PostUserDto userDto) {
        ModelMapper modelMapper = new ModelMapper();

        userRepository.saveAndFlush(modelMapper.map(userDto, UserEntity.class));
        return ResponseEntity.ok("User created sucessfully!");
    }
    
    @DeleteMapping(value = "/deleteuser/{id}")
    ResponseEntity<String> deleteUser(@PathVariable long id){
        userRepository.deleteById(id);

        return ResponseEntity.ok("Deleted user successfully!");
    }
}
