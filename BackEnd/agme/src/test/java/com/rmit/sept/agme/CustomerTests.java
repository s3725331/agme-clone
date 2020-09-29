package com.rmit.sept.agme;

import com.rmit.sept.agme.model.Account;
import com.rmit.sept.agme.model.Customer;
import com.rmit.sept.agme.repositories.AccountRepository;
import com.rmit.sept.agme.repositories.CustomerRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class CustomerTests {
    @Autowired
    CustomerRepository customerRepository;

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
        Customer customer = new Customer(account);
        Customer newCustomer = customerRepository.save(customer);

        assertThat(newCustomer.getCreatedAt()).isNotNull();
    }

    @Test
    public void testModifiedDate(){
        Account account = new Account();
        account.setPassword("password");
        account.setAddress("adsadasdasdsa");
        account.setLastName("sdfsdfsdf");
        account.setFirstName("sgrgergerg");
        account.setEmail("gmail21@gmail.com");

        Account account2 = new Account();
        account2.setPassword("password2");
        account2.setAddress("testing street");
        account2.setLastName("replace");
        account2.setFirstName("bob");
        account2.setEmail("email22@gmail.com");
        accountRepository.save(account);
        accountRepository.save(account2);
        Customer customer = new Customer(account);

        Customer newCustomer = customerRepository.save(customer);
        newCustomer.setAccount(account2);
        Customer updatedCustomer = customerRepository.save(newCustomer);

        assertThat(updatedCustomer.getModifiedAt()).isNotNull();
    }
}
