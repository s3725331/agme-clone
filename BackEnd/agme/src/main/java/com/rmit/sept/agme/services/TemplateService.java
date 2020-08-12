package com.rmit.sept.agme.services;

import com.rmit.sept.agme.model.TemplateEntity;
import com.rmit.sept.agme.repositories.TemplateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TemplateService {
    @Autowired
    private TemplateRepository templateRepository;

    public TemplateEntity saveOrUpdate(TemplateEntity temp){
        //Business logic

        return templateRepository.save(temp);
    }
}
