package com.Image.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="doctors")
public class Doctors {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "doctorid")
    private int doctorid;
    @Column(name = "username")
    private String username;
    @Column(name = "password")
    private String password;
    @Column(name = "firstname")
    private String firstname;
    @Column(name = "lastname")
    private String lastname;
    @Column(name = "specialization")
    private String specialization;
    @Column(name = "yearsofexperience")
    private String yearsofexperience;
    @Column(name = "mobileno")
    private String mobileno;
    @Column(name = "profilepic")
    private byte[] profilepic;
    @Column(name = "bio")
    private String bio;
    @Column(name = "starttime")
    private LocalTime starttime;
    @Column(name = "endtime")
    private LocalTime endtime;

    @ManyToMany(mappedBy = "doctors", cascade = CascadeType.ALL)
    private Set<Patients> patients;
}
