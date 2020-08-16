package com.rmit.sept.agme;

import com.rmit.sept.agme.model.Account;
import com.rmit.sept.agme.model.Customer;
import com.rmit.sept.agme.repositories.AccountRepository;
import com.rmit.sept.agme.repositories.CustomerRepository;
import com.rmit.sept.agme.services.CustomerService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class CustomerServiceTests {

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    CustomerService customerService;

    @Test
    public void testValidCustomerCreate() {
        Account cust = new Account();
        cust.setAddress("13 realplace drive, suburbs");
        cust.setEmail("Juan@mail.com");
        cust.setFirstName("Juan");
        cust.setLastName("Rosso");
        cust.setPassword("password");
        Account newAccount = accountRepository.save(cust);
        assertTrue(customerService.create(newAccount.getId()).isPresent());
    }

    @Test
    public void testInvalidCustomerCreate() {
        Account cust = new Account();
        cust.setAddress("13 realplace drive, suburbs");
        cust.setEmail("Juan@mail.com");
        cust.setFirstName("Juan");
        cust.setLastName("Rosso");
        cust.setPassword("password");
        Account newAccount = accountRepository.save(cust);
        assertFalse(customerService.create(12345).isPresent());
    }
    @Test
    public void testValidCustomerGet() {
        Account cust = new Account();
        cust.setAddress("13 realplace drive, suburbs");
        cust.setEmail("Juan@mail.com");
        cust.setFirstName("Juan");
        cust.setLastName("Rosso");
        cust.setPassword("password");
        Account newAccount = accountRepository.save(cust);
        Customer customer = new Customer(newAccount);
        Customer newCustomer = customerRepository.save(customer);
        assertTrue(customerService.get(newCustomer.getId()).isPresent());
    }

    @Test
    public void testInvalidCustomerGet() {
        Account cust = new Account();
        cust.setAddress("13 realplace drive, suburbs");
        cust.setEmail("Juan@mail.com");
        cust.setFirstName("Juan");
        cust.setLastName("Rosso");
        cust.setPassword("password");
        Account newAccount = accountRepository.save(cust);
        Customer customer = new Customer(newAccount);
        Customer newCustomer = customerRepository.save(customer);
        assertFalse(customerService.get(12345).isPresent());
    }

    @Test
    public void testValidCustomerUpdate() {
        Account cust = new Account();
        cust.setAddress("13 realplace drive, suburbs");
        cust.setEmail("Juan@mail.com");
        cust.setFirstName("Juan");
        cust.setLastName("Rosso");
        cust.setPassword("password");
        Account newAccount = accountRepository.save(cust);
        Customer customer = new Customer(newAccount);
        Customer newCustomer = customerRepository.save(customer);
        assertEquals(customerService.update(newCustomer).get(),newCustomer);
    }

    @Test
    public void testInvalidCustomerUpdate() {
        Account cust = new Account();
        cust.setAddress("13 realplace drive, suburbs");
        cust.setEmail("Juan@mail.com");
        cust.setFirstName("Juan");
        cust.setLastName("Rosso");
        cust.setPassword("password");
        Account newAccount = accountRepository.save(cust);
        Customer customer = new Customer(newAccount);
        Customer newCustomer = customerRepository.save(customer);
        assertFalse(customerService.update(new Customer(cust)).isPresent());
    }

}
