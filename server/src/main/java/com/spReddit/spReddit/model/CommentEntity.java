package com.spReddit.spReddit.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class CommentEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String content;
    private int likecount = 0;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "thread_id", nullable = false)
    private ThreadEntity thread;

    public CommentEntity(String content, UserEntity user, ThreadEntity thread) {
        this.content = content;
        this.user = user;
        this.thread = thread;
    }

    public CommentEntity() {}
}
