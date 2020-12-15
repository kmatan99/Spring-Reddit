package com.spReddit.spReddit.repository;

import com.spReddit.spReddit.model.ThreadEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ThreadRepository extends JpaRepository<ThreadEntity, Long> {
    public Optional<ThreadEntity> findById(Long id);
    public Optional<ThreadEntity> findByUserId(Long id);
}
