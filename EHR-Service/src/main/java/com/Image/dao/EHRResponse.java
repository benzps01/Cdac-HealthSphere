package com.Image.dao;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EHRResponse {

    private int ehrId;
    private int doctorId;
    private String drName;
    private int patientId;
    private Date visitDate;
    private String diagnosis;
    private String treatment;
    private String prescriptions;
    private String notes;

}
