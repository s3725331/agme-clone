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

    //Sets accepted state of worker to true
    @PatchMapping("/authenticate")
    public ResponseEntity<?> authenticateWorker(@RequestParam("workerId") long id){
        //Authenticate worker in repo
        Optional<Worker> worker = workerService.authenticate(id);
        if(!worker.isPresent()){
            return new ResponseEntity<>("No Worker found", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(worker, HttpStatus.OK); //Updated worker returned
    }

    //Create worker from new account
    //First, the new account is created and saved
    //A new worker is then created and saved with new object
    @PostMapping("/account")
    public ResponseEntity<?> createWorkerAccount(@Valid @RequestBody Account account, BindingResult result){
        if(result.hasErrors()) { //Invalid account object in request body
            return new ResponseEntity<>("Invalid Accounts Object", HttpStatus.BAD_REQUEST);
        }

        //Create new account in repo
        Optional<Account> savedAccount = accountService.create(account);
        if(!savedAccount.isPresent()){ //Non unique email
            return new ResponseEntity<>("Invalid Email", HttpStatus.CONFLICT);
        }

        //Create new worker with account in repo
        Optional<Worker> savedWorker = workerService.create(savedAccount.get().getId());
        if(!savedWorker.isPresent()){
            return new ResponseEntity<>("Invalid Account Id", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(savedWorker, HttpStatus.CREATED); //New worker object return
    }

    //Create new customer from existing account
    @PostMapping("")
    public ResponseEntity<?> createWorker(@RequestParam("accountId") long accountId){
        //Create new worker from existing account
        Optional<Worker> savedWorker = workerService.create(accountId);
        if(!savedWorker.isPresent()){ //No account found
            return new ResponseEntity<>("Invalid Account Id", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(savedWorker, HttpStatus.CREATED); //new worker object return
    }

    //Get customer by its account id
    @GetMapping("")
    public ResponseEntity<?> getWorker(@RequestParam("accountId") long accountId){
        //Get account from repo
        Optional<Account> account = accountService.get(accountId);
        if(!account.isPresent()){ //No account saved with accountId
            return new ResponseEntity<>("Invalid Account Id", HttpStatus.NOT_FOUND);
        }

        //Get worker by account from repo
        Optional<Worker> worker = workerService.getByAccount(account.get());
        if(!worker.isPresent()){ //No worker found with this account
            return new ResponseEntity<>("No Worker Found", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(worker,HttpStatus.OK); //Worker returned
    }

    //Get all workers
    @GetMapping("/all")
    public ResponseEntity<?> getAllWorker(){
        //Get all workers from repo
        Iterable<Worker> worker = workerService.getAll();

        if(!worker.iterator().hasNext()){//no workers in repo
            return new ResponseEntity<>("No Worker Found", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(worker,HttpStatus.OK); //Array og workers returned
    }

    @PutMapping("")
    public ResponseEntity<?> updateWorker(@Valid @RequestBody Worker worker, BindingResult result){
        if(result.hasErrors()) { //Invalid worker object in request body
            return new ResponseEntity<>("Invalid Account Object", HttpStatus.BAD_REQUEST);
        }

        //Update worker in repo
        Optional<Worker> savedWorker = workerService.update(worker);
        if(!savedWorker.isPresent()) //No worker found
            return new ResponseEntity<>("Worker Not Found", HttpStatus.NOT_FOUND);

        return new ResponseEntity<>(savedWorker, HttpStatus.OK); //Updated worker returned
    }
}
