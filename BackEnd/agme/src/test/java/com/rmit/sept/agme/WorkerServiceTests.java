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
    public void testValidWorkerCreate() {
        Account work = new Account();
        work.setAddress("26 Hill Avenue EastLand");
        work.setEmail("bob@gmail.com");
        work.setFirstName("Bob");
        work.setLastName("Builder");
        work.setPassword("password");
        Account newAccount = accountRepository.save(work);
        assertTrue(workerService.create(newAccount.getId()).isPresent());
    }

    @Test
    public void testInvalidWorkerCreate() {
        Account work = new Account();
        work.setAddress("132 Wayne Street Etihad");
        work.setEmail("dominic@gmail.com");
        work.setFirstName("Dominic");
        work.setLastName("Person");
        work.setPassword("password123");
        Account newAccount = accountRepository.save(work);
        assertFalse(workerService.create(12345).isPresent());
    }
    @Test
    public void testValidWorkerGet() {
        Account work = new Account();
        work.setAddress("132 Wayne Street Etihad");
        work.setEmail("dominic@gmail.com");
        work.setFirstName("Dominic");
        work.setLastName("Person");
        work.setPassword("password123");
        Account newAccount = accountRepository.save(work);
        Worker worker = new Worker(newAccount);
        Worker newWorker = workerRepository.save(worker);
        assertTrue(workerService.get(newWorker.getId()).isPresent());
    }

    @Test
    public void testInvalidWorkerGet() {
        Account work = new Account();
        work.setAddress("26 Hill Avenue EastLand");
        work.setEmail("bob@gmail.com");
        work.setFirstName("Bob");
        work.setLastName("Builder");
        work.setPassword("password");
        Account newAccount = accountRepository.save(work);
        Worker worker = new Worker(newAccount);
        Worker newWorker = workerRepository.save(worker);
        assertFalse(workerService.get(12345).isPresent());
    }

    @Test
    public void testValidWorkerUpdate() {
        Account work = new Account();
        work.setEmail("ashley@gmail.com");
        work.setPassword("password123");
        work.setFirstName("Ashley");
        work.setLastName("Dale");
        work.setAddress("34 Albert Road Tower");
        Account newAccount = accountRepository.save(work);
        Worker worker = new Worker(newAccount);
        Worker newWorker = workerRepository.save(worker);
        assertEquals(workerService.update(newWorker).get(),newWorker);
    }

    @Test
    public void testInvalidWorkerUpdate() {
        Account work = new Account();
        work.setEmail("ashley@gmail.com");
        work.setPassword("password123");
        work.setFirstName("Ashley");
        work.setLastName("Dale");
        work.setAddress("34 Albert Road Tower");
        Account newAccount = accountRepository.save(work);
        Worker worker = new Worker(newAccount);
        Worker newWorker = workerRepository.save(worker);
        assertFalse(workerService.update(new Worker(work)).isPresent());
    }
}
