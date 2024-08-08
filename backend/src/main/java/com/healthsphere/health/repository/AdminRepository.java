package com.healthsphere.health.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.healthsphere.health.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, Integer> {
	Admin findByUsername(String username);
}
