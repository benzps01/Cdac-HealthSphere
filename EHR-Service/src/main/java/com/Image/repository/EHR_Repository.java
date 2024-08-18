package com.Image.repository;

import com.Image.entity.EHR;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EHR_Repository extends JpaRepository<EHR, Integer> {
}
