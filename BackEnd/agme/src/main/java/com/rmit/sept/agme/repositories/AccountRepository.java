package com.rmit.sept.agme.repositories;

import com.rmit.sept.agme.model.Account;
import org.springframework.data.repository.CrudRepository;

public interface AccountRepository extends CrudRepository<Account, Long> {

}
