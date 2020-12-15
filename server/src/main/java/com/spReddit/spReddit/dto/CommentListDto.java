package com.spReddit.spReddit.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
public class CommentListDto implements Serializable {

    private List<CommentDto> commentList;
}
