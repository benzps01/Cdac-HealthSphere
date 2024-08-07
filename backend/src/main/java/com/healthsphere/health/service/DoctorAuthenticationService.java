package com.healthsphere.health.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.healthsphere.health.entity.AuthenticationResponse;
import com.healthsphere.health.entity.Doctors;
import com.healthsphere.health.repository.DoctorRepository;

@Service
public class DoctorAuthenticationService {

	@Autowired
	private DoctorRepository doctorRepo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private JwtUtilService jwtUtilService;
	
	@Autowired
	private AuthenticationManager authManager;
	
	public AuthenticationResponse register(Doctors request) {
		Doctors doctor = new Doctors();
		doctor.setName(request.getName());
		doctor.setUsername(request.getUsername());
		doctor.setMobile(request.getMobile());
		doctor.setSpecialization(request.getSpecialization());
		doctor.setPassword(passwordEncoder.encode(request.getPassword()));
		
		doctor = doctorRepo.save(doctor);
		
		String token = jwtUtilService.generateToken(doctor, doctor.getId());
		return new AuthenticationResponse(token);
	}
	
	
	public AuthenticationResponse authenticate(Doctors request) {
		authManager.authenticate((new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())));
		Doctors doctor = doctorRepo.findByUsername(request.getUsername());
		String token = jwtUtilService.generateToken(doctor, doctor.getId());
		return new AuthenticationResponse(token);
	}
}
