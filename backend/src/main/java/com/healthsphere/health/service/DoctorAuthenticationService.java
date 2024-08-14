package com.healthsphere.health.service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
	
	public AuthenticationResponse register(Doctors request, MultipartFile profilepic) throws IOException {
		Doctors doctor = new Doctors();
		doctor.setUsername(request.getUsername());
		doctor.setPassword(passwordEncoder.encode(request.getPassword()));
		doctor.setFirstname(request.getFirstname());
		doctor.setLastname(request.getLastname());
		doctor.setSpecialization(request.getSpecialization());
		doctor.setMobileno(request.getMobileno());
		doctor.setYearsofexperience(request.getYearsofexperience());
		doctor.setBio(request.getBio());
		
		if(profilepic != null && !profilepic.isEmpty()) {
			doctor.setProfilepic(profilepic.getBytes());
		}
		
		doctor = doctorRepo.save(doctor);
		
		String token = jwtUtilService.generateToken(doctor, doctor.getDoctorid());
		return new AuthenticationResponse(token);
	}
	
	public AuthenticationResponse authenticate(Doctors request) {
		authManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
		Doctors doctor = doctorRepo.findByUsername(request.getUsername());
		String token = jwtUtilService.generateToken(doctor, doctor.getDoctorid());
		return new AuthenticationResponse(token);
	}
	
	public byte[] getProfilePic(int doctorid) {
		Doctors doctor = doctorRepo.findById(doctorid).orElseThrow(() -> new RuntimeException("Doctor not found"));
		return doctor.getProfilepic();
	}
}
