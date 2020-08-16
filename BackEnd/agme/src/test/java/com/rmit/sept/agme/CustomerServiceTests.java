package com.rmit.sept.agme;

import com.rmit.sept.agme.model.Account;
import com.rmit.sept.agme.model.Customer;
import com.rmit.sept.agme.repositories.AccountRepository;
import com.rmit.sept.agme.repositories.CustomerRepository;
import com.rmit.sept.agme.services.CustomerService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

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
        CustomerService cuServ = new CustomerService();
        cust.setAddress("13 realplace drive, suburbs");
        cust.setEmail("Juan@mail.com");
        cust.setFirstName("Juan");
        cust.setLastName("Rosso");
        cust.setPassword("password");
//        cust.setId(12345);
        Account newAccount = accountRepository.save(cust);
//        Customer customer = new Customer(cust);
//        Customer newCustomer = customerRepository.save(customer);
        assertTrue(customerService.create(newAccount.getId()).isPresent());
    }

    @Test
    public void testInvalidCustomerCreate() {
        Account cust = new Account();
        CustomerService cuServ = new CustomerService();
        cust.setAddress("13 realplace drive, suburbs");
        cust.setEmail("Juan@mail.com");
        cust.setFirstName("Juan");
        cust.setLastName("Rosso");
        cust.setPassword("password");
//        cust.setId(12345);
        Account newAccount = accountRepository.save(cust);
//        Customer customer = new Customer(cust);
//        Customer newCustomer = customerRepository.save(customer);
        assertFalse(customerService.create(12345).isPresent());
    }
}
