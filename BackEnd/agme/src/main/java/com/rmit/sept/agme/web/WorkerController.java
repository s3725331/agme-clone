package com.rmit.sept.agme.web;


import com.rmit.sept.agme.model.Account;
import com.rmit.sept.agme.model.Customer;
import com.rmit.sept.agme.model.Worker;
import com.rmit.sept.agme.services.AccountService;
import com.rmit.sept.agme.services.WorkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/api/worker")
@CrossOrigin
public class WorkerController {
    @Autowired
    WorkerService workerService;

    @Autowired
    AccountService accountService;

    @PatchMapping("/authenticate")
    public ResponseEntity<?> authenticateWorker(@RequestParam("workerId") long id){
        Optional<Worker> worker = workerService.authenticate(id);
        if(!worker.isPresent()){
            return new ResponseEntity<>("No Worker found", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(worker, HttpStatus.OK);
    }

    @PostMapping("/account")
    public ResponseEntity<?> createWorkerAccount(@Valid @RequestBody Account account, BindingResult result){
        if(result.hasErrors()) {
            return new ResponseEntity<>("Invalid Accounts Object", HttpStatus.BAD_REQUEST);
        }

        Optional<Account> savedAccount = accountService.create(account);
        if(!savedAccount.isPresent()){
            return new ResponseEntity<>("Invalid Email", HttpStatus.CONFLICT);
        }

        Optional<Worker> savedWorker = workerService.create(savedAccount.get().getId());
        if(!savedWorker.isPresent()){
            return new ResponseEntity<>("Invalid Account Id", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(savedWorker, HttpStatus.CREATED);
    }

    @PostMapping("")
    public ResponseEntity<?> createWorker(@RequestParam("accountId") long accountId){
        Optional<Worker> savedWorker = workerService.create(accountId);
        if(!savedWorker.isPresent()){
            return new ResponseEntity<>("Invalid Account Id", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(savedWorker, HttpStatus.CREATED);
    }

    @GetMapping("")
    public ResponseEntity<?> getCustomer(@RequestParam("id") long id){
        Optional<Worker> worker = workerService.get(id);

        if(!worker.isPresent()){
            return new ResponseEntity<>("No Worker Found", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(worker,HttpStatus.OK);
    }

    @PutMapping("")
    public ResponseEntity<?> updateCustomer(@Valid @RequestBody Worker worker, BindingResult result){
        if(result.hasErrors()) {
            return new ResponseEntity<>("Invalid Account Object", HttpStatus.BAD_REQUEST);
        }

        Optional<Worker> savedWorker = workerService.update(worker);
        if(!savedWorker.isPresent())
            return new ResponseEntity<>("Worker Not Found", HttpStatus.NOT_FOUND);

        return new ResponseEntity<>(savedWorker, HttpStatus.OK);
    }
}
