package com.rmit.sept.agme.web;

import com.rmit.sept.agme.model.TemplateEntity;
import com.rmit.sept.agme.services.TemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.HashMap;

@RestController
@RequestMapping("/api/template")
public class TemplateController {
    @Autowired
    private TemplateService templateService;

    @PostMapping("")
    public ResponseEntity<?> createNewPerson(@Valid @RequestBody TemplateEntity temp, BindingResult result){
        if(result.hasErrors()) {
            return new ResponseEntity<>("Invalid Person Object", HttpStatus.BAD_REQUEST);
        }

        TemplateEntity savedTemp = templateService.saveOrUpdate(temp);
        return new ResponseEntity<>(savedTemp, HttpStatus.CREATED);
    }
}
