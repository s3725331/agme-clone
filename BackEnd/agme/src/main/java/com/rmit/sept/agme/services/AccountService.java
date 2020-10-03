package com.rmit.sept.agme.services;

import com.rmit.sept.agme.model.Account;
import com.rmit.sept.agme.repositories.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountService {
    @Autowired
    AccountRepository accountRepository;

    //private save used by create and update methods
    /*private Optional<Account> saveOrUpdate(Account account){
        //Enforcing uniqueness of emails
        Iterable<Account> accounts = accountRepository.getByEmail(account.getEmail());
        if(accounts.iterator().hasNext() &&
            accounts.iterator().next().getId() != account.getId()){
            return Optional.empty(); //save failed by non-unique email
        }

        return Optional.of(accountRepository.save(account)); //successful save
    }

    public Optional<Account> get(long id){
        return accountRepository.findById(id);
    }

    public Optional<Account> getByEmail(String email) {
        Iterable<Account> accounts = accountRepository.getByEmail(email);
        if(accounts.iterator().hasNext())
            return Optional.of(accounts.iterator().next()); //Iterator flattened to optional as emails are unique (only 1)
        else
            return Optional.empty();
    }

    //create new account
    public Optional<Account> create(Account account){
        return saveOrUpdate(account);
    }

    //update existing account
    public Optional<Account> update(Account account){
        if(!accountRepository.findById(account.getId()).isPresent())
            return Optional.empty(); //Account not found in repo

        return saveOrUpdate(account);
    }*/
}
