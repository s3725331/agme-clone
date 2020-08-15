package com.rmit.sept.agme.services;

import com.rmit.sept.agme.repositories.WorkerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WorkerService {
    @Autowired
    WorkerRepository workerRepository;
}
