package com.healthsphere.health.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.healthsphere.health.entity.Admin;
import com.healthsphere.health.entity.Doctors;
import com.healthsphere.health.entity.Patients;
import com.healthsphere.health.repository.AdminRepository;
import com.healthsphere.health.repository.DoctorRepository;
import com.healthsphere.health.repository.PatientRepository;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private DoctorRepository doctorRepo;

    @Autowired
    private PatientRepository patientRepo;
    
    @Autowired
    private AdminRepository adminRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Doctors doctor = doctorRepo.findByUsername(username);
        System.out.println(doctor.toString());
        if (doctor != null) {
            return doctor;
        }
        System.out.println("Reached here");
        Patients patient = patientRepo.findByUsername(username);
        if (patient != null) {
            return patient;
        }
        
        Admin admin = adminRepo.findByUsername(username);
        if(admin != null) {
        	return admin;
        }
        
        throw new UsernameNotFoundException("User not found");
    }

    public Doctors getDoctorByName(String name) {
        return doctorRepo.findByName(name);
    }

    public Patients getPatientByName(String name) {
        return patientRepo.findByName(name);
    }
    
    public Admin getAdminByUsername(String username) {
    	return adminRepo.findByUsername(username);
    }
}
