package com.healthsphere.health.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.healthsphere.health.entity.AuthenticationResponse;
import com.healthsphere.health.entity.Patients;
import com.healthsphere.health.repository.PatientRepository;

@Service
public class AuthenticationService {

	@Autowired
	private PatientRepository patientRepo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private JwtUtilService jwtUtilService;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	public AuthenticationResponse register(Patients request) {
		Patients patient = new Patients();
		patient.setName(request.getName());
		patient.setUsername(request.getUsername());
		patient.setEmail(request.getEmail());
		patient.setMobile(request.getMobile()); 
		patient.setBloodgroup(request.getBloodgroup());
		patient.setPassword(passwordEncoder.encode(request.getPassword()));
		
		patient = patientRepo.save(patient);
		
		String token = jwtUtilService.generateToken(patient);
		return new AuthenticationResponse(token);
	}
	
	public AuthenticationResponse authenticate(Patients request) {
		System.out.println("Reached here 3");
		System.out.println(request.getUsername());
		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
		System.out.println("Authenticated user: " + request.getUsername());
		System.out.println(request);
		Patients patient = patientRepo.findByUsername(request.getUsername());
		String token = jwtUtilService.generateToken(patient);
		
		return new AuthenticationResponse(token);
	}
	
}
