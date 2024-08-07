package com.healthsphere.health.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.healthsphere.health.entity.Doctors;
import com.healthsphere.health.entity.Patients;
import com.healthsphere.health.repository.DoctorRepository;
import com.healthsphere.health.repository.PatientRepository;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private DoctorRepository doctorRepo;

    @Autowired
    private PatientRepository patientRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Doctors doctor = doctorRepo.findByUsername(username);
        if (doctor != null) {
            return doctor;
        }
        
        Patients patient = patientRepo.findByUsername(username);
        if (patient != null) {
            return patient;
        }
        
        throw new UsernameNotFoundException("User not found");
    }

    public Doctors getDoctorByName(String username) {
        return doctorRepo.findByName(username);
    }

    public Patients getPatientByName(String username) {
        return patientRepo.findByName(username);
    }
}
