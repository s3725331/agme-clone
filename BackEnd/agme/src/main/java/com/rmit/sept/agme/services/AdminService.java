package com.rmit.sept.agme.services;

import com.rmit.sept.agme.model.Account;
import com.rmit.sept.agme.model.Admin;
import com.rmit.sept.agme.repositories.AccountRepository;
import com.rmit.sept.agme.repositories.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {
    @Autowired
    AdminRepository adminRepository;

    @Autowired
    AccountRepository accountRepository;

    public Optional<Admin> getByAccount(Account account) {
        Iterable<Admin> admins = adminRepository.getByAccount(account);

        if(admins.iterator().hasNext())
            return Optional.of(admins.iterator().next()); //Customer found
        else
            return Optional.empty(); //No customer found
    }
}
