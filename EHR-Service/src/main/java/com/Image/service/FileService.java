package com.Image.service;

import com.Image.entity.File;
import com.Image.repository.FileRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class FileService {

    @Autowired
    private FileRepo fileRepo;

    public void saveFile(MultipartFile file) throws IOException {
        File f = new File();
        f.setFile(file.getBytes());
        fileRepo.save(f);
    }

    public File getFile(int id) {
        return fileRepo.findById(id).orElseThrow(()-> new RuntimeException("Wrong Id!!"));
    }
}
