package com.rmit.sept.agme.web;

import com.rmit.sept.agme.model.Customer;
import com.rmit.sept.agme.model.TemplateEntity;
import com.rmit.sept.agme.model.Worker;
import com.rmit.sept.agme.services.CustomerService;
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

@RestController
@RequestMapping("/api/customer")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @PostMapping("")
    public ResponseEntity<?> createCustomer(@Valid @RequestBody Customer customer, BindingResult result) {
        return null;
    }
}
