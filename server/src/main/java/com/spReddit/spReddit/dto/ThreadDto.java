package com.spReddit.spReddit.dto;

import com.spReddit.spReddit.model.ThreadEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ThreadDto implements Serializable {

    private Long id;
    private String title;
    private String content;
    private String imageUrl;
    private int likecount;

    public ThreadDto(ThreadEntity threadEntity) {
        this.id = threadEntity.getId();
        this.title = threadEntity.getTitle();
        this.content = threadEntity.getContent();
        this.imageUrl = threadEntity.getImageUrl();
        this.likecount = threadEntity.getLikecount();
    }
}
