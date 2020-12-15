package com.spReddit.spReddit.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ThreadListDto implements Serializable {

    private List<ThreadDto> threadList;
}
