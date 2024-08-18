package com.Image.service;

import com.Image.dao.EHRResponse;
import com.Image.entity.Doctors;
import com.Image.entity.EHR;
import com.Image.entity.Patients;
import com.Image.repository.DoctorsRepository;
import com.Image.repository.EHR_Repository;
import com.Image.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EHR_Service {

    @Autowired
    private DoctorsRepository doctorsRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private EHR_Repository ehr_repository;

    public String save(EHR request, MultipartFile xray) throws IOException {
        EHR ehr = new EHR();

        ehr.setVisitdate(request.getVisitdate());
        ehr.setDiagnosis(request.getDiagnosis());
        ehr.setTreatment(request.getTreatment());
        ehr.setPrescriptions(request.getPrescriptions());
        if (xray != null && !xray.isEmpty()) {
            ehr.setXrayimage(xray.getBytes());
        }
        ehr.setNotes(request.getNotes());

        Doctors doctor = doctorsRepository.findById(request.getDoctor()
                .getDoctorid()).orElseThrow(()->new RuntimeException("not found"));
        Patients patient = patientRepository.findById(request.getPatient()
                .getPatientid()).orElseThrow(()->new RuntimeException("not found"));

        ehr.setDoctor(doctor);
        ehr.setPatient(patient);

        ehr_repository.save(ehr);
        return "Data persisted successfully";
    }
}
