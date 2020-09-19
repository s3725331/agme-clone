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

    public Optional<Worker> authenticate(long id){
        Optional<Worker> worker = workerRepository.findById(id);

        if(!worker.isPresent()) {
            return Optional.empty();
        }

        worker.get().setAccepted(true);
        return Optional.of(workerRepository.save(worker.get()));
    }

    private Worker saveOrUpdate(Worker account){
        return workerRepository.save(account);
    }

    public Optional<Worker> get(long id){
        return workerRepository.findById(id);
    }

    public Optional<Worker> getByAccount(Account account) {

        Iterable<Worker> workers = workerRepository.getByAccount(account);

        if(workers.iterator().hasNext())
            return Optional.of(workers.iterator().next());
        else
            return Optional.empty();
    }



    public Optional<Worker> create(long accountID){
        Optional<Account> userAccount = accountRepository.findById(accountID);
        if(!userAccount.isPresent()){
            return Optional.empty();
        }

        Worker newWorker = new Worker(userAccount.get());

        return Optional.of(saveOrUpdate(newWorker));
    }

    public Optional<Worker> update(Worker account){
        if(!workerRepository.findById(account.getId()).isPresent())
            return Optional.empty();

        return Optional.of(account);
    }

    public Iterable<Worker> getAll(){
        return workerRepository.findAll();
    }
}
