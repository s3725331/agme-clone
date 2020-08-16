package com.rmit.sept.agme;

import com.rmit.sept.agme.model.Account;
import com.rmit.sept.agme.model.Worker;
import com.rmit.sept.agme.repositories.AccountRepository;
import com.rmit.sept.agme.repositories.WorkerRepository;
import com.rmit.sept.agme.services.WorkerService;
import org.hibernate.jdbc.Work;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class WorkerServiceTests {

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    WorkerRepository workerRepository;

    @Autowired
    WorkerService workerService;

    @Test
    public void testValidCustomerCreate() {
        Account work = new Account();
        work.setAddress("13 realplace drive, suburbs");
        work.setEmail("Juan@mail.com");
        work.setFirstName("Juan");
        work.setLastName("Rosso");
        work.setPassword("password");
        Account newAccount = accountRepository.save(work);
        assertTrue(workerService.create(newAccount.getId()).isPresent());
    }

    @Test
    public void testInvalidCustomerCreate() {
        Account work = new Account();
        work.setAddress("13 realplace drive, suburbs");
        work.setEmail("Juan@mail.com");
        work.setFirstName("Juan");
        work.setLastName("Rosso");
        work.setPassword("password");
        Account newAccount = accountRepository.save(work);
        assertFalse(workerService.create(12345).isPresent());
    }
    @Test
    public void testValidCustomerGet() {
        Account work = new Account();
        work.setAddress("13 realplace drive, suburbs");
        work.setEmail("Juan@mail.com");
        work.setFirstName("Juan");
        work.setLastName("Rosso");
        work.setPassword("password");
        Account newAccount = accountRepository.save(work);
        Worker worker = new Worker(newAccount);
        Worker newWorker = workerRepository.save(worker);
        assertTrue(workerService.get(newWorker.getId()).isPresent());
    }

    @Test
    public void testInvalidCustomerGet() {
        Account work = new Account();
        work.setAddress("13 realplace drive, suburbs");
        work.setEmail("Juan@mail.com");
        work.setFirstName("Juan");
        work.setLastName("Rosso");
        work.setPassword("password");
        Account newAccount = accountRepository.save(work);
        Worker worker = new Worker(newAccount);
        Worker newWorker = workerRepository.save(worker);
        assertFalse(workerService.get(12345).isPresent());
    }

    @Test
    public void testValidCustomerUpdate() {
        Account work = new Account();
        work.setAddress("13 realplace drive, suburbs");
        work.setEmail("Juan@mail.com");
        work.setFirstName("Juan");
        work.setLastName("Rosso");
        work.setPassword("password");
        Account newAccount = accountRepository.save(work);
        Worker worker = new Worker(newAccount);
        Worker newWorker = workerRepository.save(worker);
        assertEquals(workerService.update(newWorker).get(),newWorker);
    }

    @Test
    public void testInvalidCustomerUpdate() {
        Account work = new Account();
        work.setAddress("13 realplace drive, suburbs");
        work.setEmail("Juan@mail.com");
        work.setFirstName("Juan");
        work.setLastName("Rosso");
        work.setPassword("password");
        Account newAccount = accountRepository.save(work);
        Worker worker = new Worker(newAccount);
        Worker newWorker = workerRepository.save(worker);
        assertNotEquals(workerService.update(new Worker(work)),newWorker);
    }
}
