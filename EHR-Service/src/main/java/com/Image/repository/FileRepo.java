package com.Image.repository;

import com.Image.entity.File;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepo extends JpaRepository<File, Integer> {
}
