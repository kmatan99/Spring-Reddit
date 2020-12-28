package com.spReddit.spReddit.controller;

import com.spReddit.spReddit.dto.PostThreadDto;
import com.spReddit.spReddit.dto.ThreadDto;
import com.spReddit.spReddit.dto.ThreadListDto;
import com.spReddit.spReddit.model.ThreadEntity;
import com.spReddit.spReddit.model.UserEntity;
import com.spReddit.spReddit.repository.ThreadRepository;
import com.spReddit.spReddit.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class ThreadController {

    private UserRepository userRepository;
    private ThreadRepository threadRepository;

    public ThreadController(UserRepository userRepository, ThreadRepository threadRepository) {
        this.userRepository = userRepository;
        this.threadRepository = threadRepository;
    }

    @GetMapping(value = "/getthreads")
    public ThreadListDto getAllThreads() {
        List<ThreadEntity> threadList = threadRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));

        List<ThreadDto> threadDtoList = threadList.stream().map(ThreadDto::new).collect(Collectors.toList());

        return new ThreadListDto(threadDtoList);
    }

    @GetMapping(value = "/getthread/{id}")
    public ThreadDto getSingleThread(@PathVariable Long id) throws Exception {

        ThreadEntity threadEntity = threadRepository.findById(id)
                .orElseThrow(() -> new Exception("Thread not found!"));

         ModelMapper modelMapper = new ModelMapper();

         ThreadDto thread = modelMapper.map(threadEntity, ThreadDto.class);

         return thread;
    }

    @PostMapping(value = "/createthread/{id}")
    ResponseEntity<String> createThread(@RequestBody PostThreadDto threadDto, @PathVariable Long id) throws Exception {

        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new Exception("User not found!"));

        ThreadEntity newThread = new ThreadEntity(threadDto.getTitle(), threadDto.getContent(), threadDto.getImageUrl(), user);

        threadRepository.saveAndFlush(newThread);

        return ResponseEntity.ok("Thread created!");
    }

    @DeleteMapping(value = "/deletethread/{id}")
    ResponseEntity<String> deleteThread(@PathVariable Long id) throws Exception {
        threadRepository.delete((threadRepository.findById(id)
                .orElseThrow(() -> new Exception("Thread not found!"))));

        return ResponseEntity.ok("Thread deleted!");
    }

    @PutMapping(value = "/editthread/{id}")
    ResponseEntity<String> editThread(@PathVariable Long id, @RequestBody PostThreadDto threadDto) throws Exception {

        ThreadEntity threadEntity = threadRepository.findByUserId(id)
                .orElseThrow(() -> new Exception("Thread not found!"));

        threadEntity.setContent(threadDto.getContent());
        threadEntity.setTitle(threadDto.getTitle());
        threadEntity.setImageUrl(threadDto.getImageUrl());

        threadRepository.save(threadEntity);
        return ResponseEntity.ok("Thread updated!");
    }

    @GetMapping(value = "/likethread/{id}")
    ResponseEntity<String> likeThread(@PathVariable Long id) throws Exception {

        ThreadEntity thread = threadRepository.findById(id).orElseThrow(() -> new Exception("Thread not found!"));

        thread.increaseLikes();
        threadRepository.save(thread);

        return ResponseEntity.ok("Liked thread");
    }

    @GetMapping(value = "/dislikethread/{id}")
    ResponseEntity<String> dislikeThread(@PathVariable Long id) throws Exception {

        ThreadEntity thread = threadRepository.findById(id).orElseThrow(() -> new Exception("Thread not found!"));

        thread.decreaseLikes();
        threadRepository.save(thread);

        return ResponseEntity.ok("Disliked thread");
    }

    @GetMapping(value = "/userthreads/{userid}")
    public ThreadListDto getUserThreads(@PathVariable Long userid) throws Exception {

        UserEntity user = userRepository.findById(userid)
                .orElseThrow(() -> new Exception("User not found!"));

        List<ThreadEntity> threads = user.getPostList();
        List<ThreadDto> threadsDto = threads.stream().map(ThreadDto::new).collect(Collectors.toList());

        return new ThreadListDto(threadsDto);
    }

}
