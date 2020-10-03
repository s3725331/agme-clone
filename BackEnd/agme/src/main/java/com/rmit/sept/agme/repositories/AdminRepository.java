package com.rmit.sept.agme.repositories;

import com.rmit.sept.agme.model.Account;
import com.rmit.sept.agme.model.Admin;
import org.springframework.data.repository.CrudRepository;

public interface AdminRepository extends CrudRepository<Admin, Long> {

    Iterable<Admin> getByAccount(Account account);
}
