package com.Image.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.Set;
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "patients")
public class Patients {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "patientid")
    private int patientid;
    @Column(name = "username")
    private String username;
    @Column(name = "password")
    private String password;
    @Column(name = "name")
    private String name;
    @Column(name = "email")
    private String email;
    @Column(name = "dateofbirth")
    private Date dateofbirth;
    @Column(name = "mobileno")
    private String mobileno;
    @Column(name = "address")
    private String address;
    @Column(name = "emergencycontact")
    private String emergencycontact;
    @Column(name = "bloodgroup")
    private String bloodgroup;
    @Column(name = "profilepic")
    private int[] profilepic;
    @Column(name = "gender")
    private String gender;

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<EHR> electronicHealthRecord;

    @ManyToMany
    @JoinTable(
            name = "patient_doctor",
            joinColumns = @JoinColumn(name = "patientid"),
            inverseJoinColumns = @JoinColumn(name = "doctorid")
    )
    private Set<Doctors> doctors;;
}
