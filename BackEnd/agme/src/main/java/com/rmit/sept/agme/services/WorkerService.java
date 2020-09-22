package com.rmit.sept.agme.services;

import com.rmit.sept.agme.model.Account;
import com.rmit.sept.agme.model.Customer;
import com.rmit.sept.agme.model.Worker;
import com.rmit.sept.agme.repositories.AccountRepository;
import com.rmit.sept.agme.repositories.WorkerRepository;
import org.hibernate.jdbc.Work;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WorkerService {
    @Autowired
    WorkerRepository workerRepository;

    @Autowired
    AccountRepository accountRepository;

    //Sets accepted to true for worker with id
    public Optional<Worker> authenticate(long id){
        Optional<Worker> worker = workerRepository.findById(id);

        if(!worker.isPresent()) {
            return Optional.empty(); //No worker found
        }

        //Worker authenticated
        worker.get().setAccepted(true);
        return Optional.of(workerRepository.save(worker.get()));
    }

    //Private save used by update and create
    private Worker saveOrUpdate(Worker account){
        return workerRepository.save(account);
    }

    //Get worker
    public Optional<Worker> get(long id){
        return workerRepository.findById(id);
    }

    //Get all workers
    public Iterable<Worker> getAll(){
        return workerRepository.findAll();
    }

    public Optional<Worker> getByAccount(Account account) {
        Iterable<Worker> workers = workerRepository.getByAccount(account);

        if(workers.iterator().hasNext())
            return Optional.of(workers.iterator().next()); //Worker found
        else
            return Optional.empty(); //No worker with account found
    }

    //Worker created from account
    public Optional<Worker> create(long accountID){
        Optional<Account> userAccount = accountRepository.findById(accountID);
        if(!userAccount.isPresent()){
            return Optional.empty(); //no account found, creation failed
        }

        //Worker created
        Worker newWorker = new Worker(userAccount.get());
        return Optional.of(saveOrUpdate(newWorker));
    }

    public Optional<Worker> update(Worker worker){
        if(!workerRepository.findById(worker.getId()).isPresent())
            return Optional.empty(); //No worker with

        return Optional.of(saveOrUpdate(worker)); //Worker updated
    }
}
