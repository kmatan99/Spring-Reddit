package com.spReddit.spReddit.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.io.Serializable;

@Getter
@AllArgsConstructor
public class CommentDto implements Serializable {

    private Long id;
    private Long threadid;
    private Long userid;
    private String content;
    private int likecount;
}
