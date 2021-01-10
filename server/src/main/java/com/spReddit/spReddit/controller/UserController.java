package com.spReddit.spReddit.controller;

import com.spReddit.spReddit.dto.PostUserDto;
import com.spReddit.spReddit.dto.UserDto;
import com.spReddit.spReddit.model.UserEntity;
import com.spReddit.spReddit.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;

@RestController
public class UserController {
    private UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping(value = "/getuser/{id}")
    public UserDto getUser(@PathVariable Long id) throws Exception {

        UserEntity userEntity= userRepository.findById(id)
                .orElseThrow(() -> new Exception("User not found!"));

        ModelMapper modelMapper = new ModelMapper();

        return modelMapper.map(userEntity, UserDto.class);
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

    @GetMapping(value = "/currentusername")
    public String getCurrentUserName(HttpServletRequest request) throws Exception {

        Principal principal = request.getUserPrincipal();
        UserEntity user = userRepository.findByUsername(principal.getName())
                .orElseThrow(() -> new Exception("User not found!"));

        return user.getUsername();
    }
}
