package com.Image.controller;

import com.Image.entity.File;
import com.Image.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class FileController {

    @Autowired
    private FileService fileService;

    @PostMapping("/upload")
    public ResponseEntity uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
        fileService.saveFile(file);
        return new ResponseEntity("Upload Successful", HttpStatus.CREATED);
    }

    @GetMapping("/download/{fileId}")
    public ResponseEntity<byte[]> downloadFile(@PathVariable("fileId") int fileId) {
        File file = fileService.getFile(fileId);
        return ResponseEntity.ok().header("Content-type", "file/jpeg").body(file.getFile());
    }
}
