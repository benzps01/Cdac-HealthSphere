package com.healthsphere.health.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.healthsphere.health.entity.Admin;
import com.healthsphere.health.entity.AuthenticationResponse;
import com.healthsphere.health.repository.AdminRepository;

@Service
public class AdminAuthenticationService {

	@Autowired
	private AdminRepository adminRepo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private JwtUtilService jwtUtilService;
	
	@Autowired
	private AuthenticationManager authManager;
	
	public AuthenticationResponse register(Admin request) {
		Admin admin = new Admin();
		admin.setUsername(request.getUsername());
		admin.setPassword(passwordEncoder.encode(request.getPassword()));
		
		admin = adminRepo.save(admin);
		
		String token = jwtUtilService.generateToken(admin, admin.getAdminid());
		return new AuthenticationResponse(token);
	}
	
	public AuthenticationResponse authenticate(Admin request) {
		authManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
		Admin admin = adminRepo.findByUsername(request.getUsername());
		
		String token = jwtUtilService.generateToken(admin, admin.getAdminid());
		return new AuthenticationResponse(token);
	}
	
}
