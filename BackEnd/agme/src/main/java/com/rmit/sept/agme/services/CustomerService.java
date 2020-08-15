package com.rmit.sept.agme.services;

import com.rmit.sept.agme.model.Account;
import com.rmit.sept.agme.model.Customer;
import com.rmit.sept.agme.repositories.AccountRepository;
import com.rmit.sept.agme.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerService {
    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    AccountRepository accountRepository;

    private Customer saveOrUpdate(Customer customer){
        return customerRepository.save(customer);
    }

    public Optional<Customer> get(long id){
        return customerRepository.findById(id);
    }

    public Optional<Customer> create(long accountID){
        Optional<Account> userAccount = accountRepository.findById(accountID);
        if(!userAccount.isPresent()){
            return Optional.empty();
        }

        Customer newCustomer = new Customer(userAccount.get());
        return Optional.of(saveOrUpdate(newCustomer));
    }

    public Optional<Customer> update(Customer customer){
        if(!customerRepository.findById(customer.getId()).isPresent())
            return Optional.empty();

        return Optional.of(customer);
    }
}
