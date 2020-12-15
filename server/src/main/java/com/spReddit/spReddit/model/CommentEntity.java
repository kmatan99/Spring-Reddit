package com.spReddit.spReddit.model;

import javax.persistence.*;

@Entity
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
}
