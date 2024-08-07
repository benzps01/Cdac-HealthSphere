package com.healthsphere.health.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthsphere.health.entity.AuthenticationResponse;
import com.healthsphere.health.entity.Patients;
import com.healthsphere.health.service.PatientAuthenticationService;
import com.healthsphere.health.service.JwtUtilService;
import com.healthsphere.health.service.UserService;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/health")
public class PatientController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private PatientAuthenticationService patientAuthService;
	
	@Autowired
	private JwtUtilService jwtUtilService;
	
	@GetMapping("/patient/{name}")
	public ResponseEntity<Patients> getPatientByName(@PathVariable("name") String name) {
		Patients patient = userService.getPatientByName(name);
		if(patient != null)
			return ResponseEntity.ok(patient);
		else
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}
	
	
	
	@PostMapping("/patient/register")
	public ResponseEntity<AuthenticationResponse> registerPatient(@RequestBody Patients patient) {
		try {
			AuthenticationResponse response = patientAuthService.register(patient);
			return ResponseEntity.status(HttpStatus.CREATED).body(response);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new AuthenticationResponse("Error registering Patient"));
		}
	}
	
	@PostMapping("/patient/login")
	public ResponseEntity<AuthenticationResponse> loginPatient(@RequestBody Patients patient){
		try {
			AuthenticationResponse response = patientAuthService.authenticate(patient);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new AuthenticationResponse("Incorrect username or password"));
		}
	}
	
	@GetMapping("/patient")
	public ResponseEntity<Patients> getPatient(@RequestHeader("Authorization") String token){
		
		String jwt = token.substring(7);
		String username = jwtUtilService.extractUsername(jwt);
		Patients patient = userService.getPatientByName(username);
		
		if(patient != null) {
			return ResponseEntity.ok(patient);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}
}
