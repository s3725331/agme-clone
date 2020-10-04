package com.rmit.sept.agme.web;


import com.rmit.sept.agme.model.*;
import com.rmit.sept.agme.security.JwtTokenProvider;
import com.rmit.sept.agme.services.AccountService;
import com.rmit.sept.agme.services.ServiceNameService;
import com.rmit.sept.agme.services.UserService;
import com.rmit.sept.agme.services.WorkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Iterator;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/worker")
@CrossOrigin
public class WorkerController {
    @Autowired
    WorkerService workerService;

    @Autowired
    ServiceNameService serviceNameService;

    @Autowired
    UserService userService;

    @Autowired
    JwtTokenProvider tokenProvider;

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
    //@PreAuthorize("hasRole('ROLE_WORKER')")
    /*@PostMapping("/account")
    public ResponseEntity<?> createWorkerAccount(@Valid @RequestBody Account account, @RequestParam(name = "service") String service, BindingResult result){
        if(result.hasErrors()) { //Invalid account object in request body
            return new ResponseEntity<>("Invalid Accounts Object", HttpStatus.BAD_REQUEST);
        }

        //Get service object from service repo
        ServiceName serviceObject;
        Iterator<ServiceName> services = serviceNameService.getByService(service).iterator();
        if(!services.hasNext()){
            return new ResponseEntity<>("Invalid Service", HttpStatus.CONFLICT); //Service not in repo
        } else {
            serviceObject = services.next();
        }

        //Create new account in repo
        Optional<Account> savedAccount = accountService.create(account);
        if(!savedAccount.isPresent()){ //Non unique email
            return new ResponseEntity<>("Invalid Email", HttpStatus.CONFLICT);
        }

        //Create new worker with account in repo
        Optional<Worker> savedWorker = workerService.create(savedAccount.get().getId(), serviceObject);
        if(!savedWorker.isPresent()){
            return new ResponseEntity<>("Invalid Account Id", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(savedWorker, HttpStatus.CREATED); //New worker object return
    }*/

    //Create new worker from current logged in user
    @PostMapping("")
    public ResponseEntity<?> createWorker(@RequestHeader("Authorization") String jwt, @RequestParam("service") String service){
        try{
            Long userId = tokenProvider.getUserIdFromJWT(jwt);

            //Get service object from service repo
            ServiceName serviceObject;
            Iterator<ServiceName> services = serviceNameService.getByService(service).iterator();
            if(!services.hasNext()){
                return new ResponseEntity<>("Invalid Service", HttpStatus.CONFLICT); //Service not in repo
            } else {
                serviceObject = services.next();
            }

            //Create new worker from existing user
            Optional<Worker> savedWorker = workerService.create(userId, serviceObject);
            if(!savedWorker.isPresent()){ //No user found
                return new ResponseEntity<>("Invalid User Id", HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(savedWorker, HttpStatus.CREATED); //new worker object return

        } catch(Exception e){
            return new ResponseEntity<>("Bad Jwt", HttpStatus.BAD_REQUEST); //Bad Jwt string format
        }
    }

    //Get worker by a valid jwt
    @GetMapping("")
    public ResponseEntity<?> getWorker(@RequestHeader("Authorization") String jwt){
        try{
            Long userId = tokenProvider.getUserIdFromJWT(jwt);

            //Get user from repo
            Optional<User> user = userService.get(userId);
            if(!user.isPresent()){ //No user saved with userId
                return new ResponseEntity<>("Invalid User Id", HttpStatus.NOT_FOUND);
            }

            //Get worker by account from repo
            Optional<Worker> worker = workerService.getByUser(user.get());
            if(!worker.isPresent()){
                return new ResponseEntity<>("No Worker Found", HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(worker,HttpStatus.OK); //Worker from repo returned

        } catch(Exception e){
            return new ResponseEntity<>("Bad Jwt", HttpStatus.NOT_FOUND); //Bad Jwt string format
        }
    }

    //Get worker by account id
    /*@GetMapping("")
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
    }*/

    //Get all workers
    @GetMapping("/all")
    public ResponseEntity<?> getAllWorker(){
        //Get all workers from repo
        Iterable<Worker> worker = workerService.getAllAccepted();

        if(!worker.iterator().hasNext()){//no workers in repo
            return new ResponseEntity<>("No Worker Found", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(worker,HttpStatus.OK); //Array of workers returned
    }

    //Get all workers
    @GetMapping("/all/authenticate")
    public ResponseEntity<?> getAllUnacceptedWorker(){
        //Get all workers not yet accepted from repo
        Iterable<Worker> worker = workerService.getAllUnaccepted();

        if(!worker.iterator().hasNext()){//no workers in repo
            return new ResponseEntity<>("No Worker Found", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(worker,HttpStatus.OK); //Array of workers returned
    }

    @PutMapping("")
    public ResponseEntity<?> updateWorker(@Valid @RequestBody Worker worker, BindingResult result){
        if(result.hasErrors()) { //Invalid worker object in request body
            return new ResponseEntity<>("Invalid Worker Object", HttpStatus.BAD_REQUEST);
        }

        //Update worker account in repo
        Optional<User> savedUser = userService.update(worker.getUser());
        if(!savedUser.isPresent()) //Bad account (bad id or non unique email
            return new ResponseEntity<>("Bad Account", HttpStatus.NOT_FOUND);

        //Update worker in repo
        Optional<Worker> savedWorker = workerService.update(worker);
        if(!savedWorker.isPresent()) //No worker found
            return new ResponseEntity<>("Worker Not Found", HttpStatus.NOT_FOUND);

        return new ResponseEntity<>(savedWorker, HttpStatus.OK); //Updated worker returned
    }
}
