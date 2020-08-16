package com.rmit.sept.agme;

import com.rmit.sept.agme.model.Account;
import com.rmit.sept.agme.model.Worker;
import com.rmit.sept.agme.repositories.AccountRepository;
import com.rmit.sept.agme.repositories.WorkerRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class WorkerTests {
    @Autowired
    WorkerRepository workerRepository;

    @Autowired
    AccountRepository accountRepository;

    @Test
    public void testCreatedDate(){
        Account account = new Account();
        account.setPassword("password");
        account.setAddress("adsadasdasdsa");
        account.setLastName("sdfsdfsdf");
        account.setFirstName("sgrgergerg");
        account.setEmail("gmail@gmail.com");
        accountRepository.save(account);
        Worker worker = new Worker(account);
        Worker newWorker = workerRepository.save(worker);

        assertThat(newWorker.getCreatedAt()).isNotNull();
    }

    @Test
    public void testModifiedDate(){
        Account account = new Account();
        account.setPassword("password");
        account.setAddress("adsadasdasdsa");
        account.setLastName("sdfsdfsdf");
        account.setFirstName("sgrgergerg");
        account.setEmail("gmail@gmail.com");
        accountRepository.save(account);
        Worker worker = new Worker(account);
        Worker newWorker = workerRepository.save(worker);
        newWorker.setAccepted(true);
        Worker updatedWorker = workerRepository.save(newWorker);

        assertThat(updatedWorker.getModifiedAt()).isNotNull();
    }
}
