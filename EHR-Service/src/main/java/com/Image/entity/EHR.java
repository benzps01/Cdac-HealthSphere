package com.Image.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Blob;
import java.util.Date;

import static java.sql.JDBCType.BLOB;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "ehr")
public class EHR {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ehrid")
    private int ehrid;
    @Column(name = "visitdate")
    private Date visitdate;
    @Column(name = "diagnosis")
    private String diagnosis;
    @Column(name = "treatment")
    private String treatment;
    @Column(name = "prescriptions")
    private String prescriptions;
    @Column(name = "xrayimage")
    private byte[] xrayimage;
    @Column(name = "notes")
    private String notes;

    @ManyToOne
    @JoinColumn(name = "patientid")
    private Patients patient;

    @ManyToOne
    @JoinColumn(name = "doctorid")
    private Doctors doctor;
}
