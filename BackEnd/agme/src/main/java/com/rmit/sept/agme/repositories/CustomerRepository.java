package com.rmit.sept.agme.repositories;

import com.rmit.sept.agme.model.Account;
import com.rmit.sept.agme.model.Customer;
import org.springframework.data.repository.CrudRepository;

public interface CustomerRepository extends CrudRepository<Customer, Long> {

    Iterable<Customer> getByAccount(Account account);
}
