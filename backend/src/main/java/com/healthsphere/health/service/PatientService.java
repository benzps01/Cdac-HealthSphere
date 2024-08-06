package com.healthsphere.health.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.healthsphere.health.entity.Patients;
import com.healthsphere.health.repository.PatientRepository;

@Service
public class PatientService implements UserDetailsService{
	
	@Autowired
	private PatientRepository patientRepo;
	
	public Patients getPatientByName(String name) {
		return patientRepo.findByName(name);
	}
	
	public Patients getPatientByUsername(String username){
		return patientRepo.findByUsername(username);
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Patients patient = patientRepo.findByUsername(username);
		if(patient == null) {
			throw new UsernameNotFoundException("Patient not found");
		}
		return patient;
	}
	


}
