package com.rmit.sept.agme.web;


import com.rmit.sept.agme.model.Customer;
import com.rmit.sept.agme.model.Worker;
import com.rmit.sept.agme.services.WorkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/worker")
public class WorkerController {
    @Autowired
    WorkerService workerService;

    @PostMapping("")
    public ResponseEntity<?> createWorker(@Valid @RequestBody Worker worker, BindingResult result) {
        return null;
    }
}
