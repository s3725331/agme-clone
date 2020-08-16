package com.rmit.sept.agme;


import com.rmit.sept.agme.model.Account;
import com.rmit.sept.agme.model.Admin;
import com.rmit.sept.agme.repositories.AccountRepository;
import com.rmit.sept.agme.repositories.AdminRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class AdminTests {
    @Autowired
    AdminRepository adminRepository;

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
        Admin admin = new Admin(account);
        Admin newAdmin = adminRepository.save(admin);

        assertThat(newAdmin.getCreatedAt()).isNotNull();
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
        Admin admin = new Admin(account);
        Admin newAdmin = adminRepository.save(admin);
        newAdmin.setAccount(null);
        Admin updatedAdmin = adminRepository.save(newAdmin);

        assertThat(updatedAdmin.getModifiedAt()).isNotNull();
    }
}
