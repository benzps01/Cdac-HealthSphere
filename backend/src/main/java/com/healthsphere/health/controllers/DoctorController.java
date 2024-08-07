package com.healthsphere.health.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthsphere.health.entity.AuthenticationResponse;
import com.healthsphere.health.entity.Doctors;
import com.healthsphere.health.service.DoctorAuthenticationService;
import com.healthsphere.health.service.JwtUtilService;
import com.healthsphere.health.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/health")
public class DoctorController {

	@Autowired
	private UserService userService;

	@Autowired
	private DoctorAuthenticationService doctorAuthService;

	@Autowired
	private JwtUtilService jwtUtilService;

	@PostMapping("/doctor/register")
	public ResponseEntity<AuthenticationResponse> registerDoctor(@RequestBody Doctors doctor) {
		try {
			AuthenticationResponse response = doctorAuthService.register(doctor);
			return ResponseEntity.status(HttpStatus.CREATED).body(response);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new AuthenticationResponse("Error registering Patient"));
		}
	}

	@PostMapping("/doctor/login")
	public ResponseEntity<AuthenticationResponse> loginDoctor(@RequestBody Doctors doctor) {
		try {
			AuthenticationResponse response = doctorAuthService.authenticate(doctor);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body(new AuthenticationResponse("Incorrect username or password"));
		}
	}

	@GetMapping("/doctor")
	public ResponseEntity<Doctors> getDoctor(@RequestHeader("Authorization") String token) {
		String jwt = token.substring(7);
		String username = jwtUtilService.extractUsername(jwt);
		Doctors doctor = userService.getDoctorByName(username);

		if (doctor != null) {
			return ResponseEntity.ok(doctor);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}
}
