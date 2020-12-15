package com.spReddit.spReddit.repository;

import com.spReddit.spReddit.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    public Optional<UserEntity> findById(Long id);
}
