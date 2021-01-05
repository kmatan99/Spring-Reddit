package com.spReddit.spReddit.controller;

import com.spReddit.spReddit.dto.CommentDto;
import com.spReddit.spReddit.model.CommentEntity;
import com.spReddit.spReddit.model.ThreadEntity;
import com.spReddit.spReddit.model.UserEntity;
import com.spReddit.spReddit.repository.CommentsRepository;
import com.spReddit.spReddit.repository.ThreadRepository;
import com.spReddit.spReddit.repository.UserRepository;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class CommentsController {

    private CommentsRepository commentsRepository;
    private ThreadRepository threadRepository;
    private UserRepository userRepository;

    public CommentsController(CommentsRepository commentsRepository, ThreadRepository threadRepository, UserRepository userRepository) {
        this.commentsRepository = commentsRepository;
        this.threadRepository = threadRepository;
        this.userRepository = userRepository;
    }

    @PostMapping(value = "/comment/{thread_id}")
    ResponseEntity<String> addComment(@PathVariable Long thread_id, @RequestBody CommentDto commentDto) throws Exception {

        UserEntity user = userRepository.findById(Long.valueOf(3)) //will be solver later using Principle interface
                .orElseThrow(() -> new Exception("User not found!"));

        ThreadEntity thread = threadRepository.findById(thread_id)
                .orElseThrow(() -> new Exception("Thread not found!"));

        CommentEntity newComment = new CommentEntity(commentDto.getContent(), user, thread);
        commentsRepository.saveAndFlush(newComment);

        return ResponseEntity.ok("Created comment sucessfully!");
    }

    @GetMapping(value = "/threadcomments/{thread_id}")
    public List<CommentDto> getComments(@PathVariable Long thread_id){

        List<CommentEntity> commentList = commentsRepository.findAllByThreadId(thread_id,
                Sort.by(Sort.Direction.DESC, "likecount"));

        List<CommentDto> commentDtoList = commentList.stream()
                .map(comment -> new CommentDto(
                        comment.getId(), comment.getThread().getId(), comment.getContent(), comment.getLikecount()))
                            .collect(Collectors.toList());

        return commentDtoList;
    }

    @GetMapping(value = "/likecomment/{comment_id}")
    ResponseEntity<String> likeComment(@PathVariable Long comment_id) throws Exception {

        CommentEntity comment = commentsRepository.findById(comment_id)
                .orElseThrow(() -> new Exception("Comment not found!"));

        comment.increaseLikes();
        commentsRepository.save(comment);

        return ResponseEntity.ok("Liked comment");
    }

    @GetMapping(value = "/dislikecomment/{comment_id}")
    ResponseEntity<String> dislikeComment(@PathVariable Long comment_id) throws Exception {

        CommentEntity comment = commentsRepository.findById(comment_id)
                .orElseThrow(() -> new Exception("Comment not found!"));

        comment.decreaseLikes();
        commentsRepository.save(comment);

        return ResponseEntity.ok("Disliked comment");
    }
}
