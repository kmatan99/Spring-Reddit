package com.spReddit.spReddit.model;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class ThreadEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String title;
    private String content;
    private int likecount = 0;
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @OneToMany(mappedBy = "thread")
    private List<CommentEntity> commentList;

    public ThreadEntity(String title, String content, String imageUrl, UserEntity user) {
        this.title = title;
        this.content = content;
        this.imageUrl = imageUrl;
        this.user = user;
    }

    public ThreadEntity() {}
}
