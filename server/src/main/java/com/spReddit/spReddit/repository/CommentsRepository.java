package com.spReddit.spReddit.repository;

import com.spReddit.spReddit.model.CommentEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentsRepository extends JpaRepository<CommentEntity, Long> {
    public Optional<CommentEntity> findById(Long id);
    public List<CommentEntity> findAllByThreadId(Long id, Sort var1);
}
