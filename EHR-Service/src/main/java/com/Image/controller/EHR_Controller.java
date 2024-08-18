package com.Image.controller;

import com.Image.entity.EHR;
import com.Image.service.EHR_Service;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/ehr")
public class EHR_Controller {

    @Autowired
    private EHR_Service service;

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<String> createEHr(@RequestPart("ehrdata") String ehrdata, @RequestPart("xray") MultipartFile xray) {
        try {
            ObjectMapper objMapper = new ObjectMapper();
            EHR ehr = objMapper.readValue(ehrdata, EHR.class);

            String response = service.save(ehr, xray);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error Creating Electronic Health Record");
        }
    }

}
