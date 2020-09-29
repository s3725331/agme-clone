package com.rmit.sept.agme;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import com.rmit.sept.agme.model.Account;
import com.rmit.sept.agme.repositories.AccountRepository;
import com.rmit.sept.agme.services.AccountService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class AccountServiceTests {

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    AccountService accountService;

    @Test
    public void testAccountServiceGet() {
        Account account = new Account();
        account.setEmail("bob@gmail.com");
        account.setPassword("password123");
        account.setFirstName("Bob");
        account.setLastName("Build");
        account.setAddress("26 Hill Avenue EastLand");

        Account secondAccount = accountRepository.save(account);

        assertTrue(accountService.get(secondAccount.getId()).isPresent());

    }


    @Test
    public void testAccountServiceUpdate() {
        Account account = new Account();
        account.setEmail("dominic21@gmail.com");
        account.setPassword("password123");
        account.setFirstName("Dominic");
        account.setLastName("Person");
        account.setAddress("2 Wayne Street Etihad");

        Account secondAccount = accountRepository.save(account);

        assertTrue(accountService.update(secondAccount).isPresent());

    }

    @Test
    public void testInvalidAccountServiceUpdate() {
        Account account = new Account();
        account.setEmail("dominic@gmail.com");
        account.setPassword("password123");
        account.setFirstName("Dominic");
        account.setLastName("Person");
        account.setAddress("2 Wayne Street Etihad");

        assertFalse(accountService.update(account).isPresent());

    }

    @Test
    public void testAccountServiceCreate() {
        Account account = new Account();
        account.setEmail("ashley21@gmail.com");
        account.setPassword("password123");
        account.setFirstName("Ashley");
        account.setLastName("Dale");
        account.setAddress("34 Albert Road Tower");

        //Account secondAccount = accountRepository.save(account);

        assertTrue(accountService.create(account).isPresent());
    }

    @Test
    public void testInvalidEmailDupAccountServiceCreate() {
        Account account = new Account();
        account.setEmail("ashley@gmail.com");
        account.setPassword("password123");
        account.setFirstName("Ashley");
        account.setLastName("Dale");
        account.setAddress("34 Albert Road Tower");

        Account secondAccount = accountRepository.save(account);

        assertFalse(accountService.create(secondAccount).isPresent());
    }
}
