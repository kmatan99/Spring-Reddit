package com.spReddit.spReddit.model;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String username;
    private String password;
    private String email;

    @OneToMany(mappedBy = "user")
    private List<ThreadEntity> postList;

    @OneToMany(mappedBy = "user")
    private List<CommentEntity> commentList;
}
