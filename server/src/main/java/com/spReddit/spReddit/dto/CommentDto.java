package com.spReddit.spReddit.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.io.Serializable;

@Getter
@AllArgsConstructor
public class CommentDto implements Serializable {

    private String content;
}
