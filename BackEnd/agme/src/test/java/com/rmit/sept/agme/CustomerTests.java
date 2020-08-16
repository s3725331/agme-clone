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
        account.setEmail("gmail@gmail.com");
        accountRepository.save(account);
        Customer customer = new Customer(account);
        Customer newCustomer = customerRepository.save(customer);
        newCustomer.setAccount(null);
        Customer updatedCustomer = customerRepository.save(newCustomer);

        assertThat(updatedCustomer.getModifiedAt()).isNotNull();
    }
}
