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
public class PatientAuthenticationService {

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
		patient.setUsername(request.getUsername());
		patient.setPassword(passwordEncoder.encode(request.getPassword()));
		patient.setFirstname(request.getFirstname());
		patient.setLastname(request.getLastname());
		patient.setDateofbirth(request.getDateofbirth());
		patient.setMobileno(request.getMobileno());
		patient.setBloodgroup(request.getBloodgroup());
		patient.setEmail(request.getEmail());
		patient.setAddress(request.getAddress());
		patient.setEmergencycontact(request.getEmergencycontact());
		
		patient = patientRepo.save(patient);
		
		String token = jwtUtilService.generateToken(patient, patient.getPatientid());
		return new AuthenticationResponse(token);
	}
	
	public AuthenticationResponse authenticate(Patients request) {

		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
		Patients patient = patientRepo.findByUsername(request.getUsername());
		String token = jwtUtilService.generateToken(patient, patient.getPatientid());
		
		return new AuthenticationResponse(token);
	}
	
}
