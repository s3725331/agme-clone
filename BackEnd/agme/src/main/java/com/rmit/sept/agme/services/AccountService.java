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

    private Optional<Account> saveOrUpdate(Account account){
        //Enforcing uniqueness of emails
        Iterable<Account> accounts = accountRepository.getByEmail(account.getEmail());
        if(accounts.iterator().hasNext() &&
            accounts.iterator().next().getId() != account.getId()){
            return Optional.empty();
        }

        return Optional.of(accountRepository.save(account));
    }

    public Optional<Account> get(long id){
        return accountRepository.findById(id);
    }

    public Optional<Account> create(Account account){

        return saveOrUpdate(account);
    }

    public Optional<Account> update(Account account){
        if(!accountRepository.findById(account.getId()).isPresent())
            return Optional.empty();

        return saveOrUpdate(account);
    }
}
