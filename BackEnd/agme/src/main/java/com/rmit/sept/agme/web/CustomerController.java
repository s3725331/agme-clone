package com.rmit.sept.agme.web;

import com.rmit.sept.agme.model.Account;
import com.rmit.sept.agme.model.Customer;
import com.rmit.sept.agme.services.AccountService;
import com.rmit.sept.agme.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @Autowired
    private AccountService accountService;

    @PostMapping("/account")
    public ResponseEntity<?> createCustomerAccount(@Valid @RequestBody Account account, BindingResult result){
        if(result.hasErrors()) {
            return new ResponseEntity<>("Invalid Accounts Object", HttpStatus.BAD_REQUEST);
        }

        Optional<Account> savedAccount = accountService.create(account);
        if(!savedAccount.isPresent()){
            return new ResponseEntity<>("Invalid Email", HttpStatus.CONFLICT);
        }

        Optional<Customer> savedCustomer = customerService.create(savedAccount.get().getId());
        if(!savedCustomer.isPresent()){
            return new ResponseEntity<>("Invalid Account Id", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(savedCustomer, HttpStatus.CREATED);
    }

    @PostMapping("")
    public ResponseEntity<?> createCustomer(@RequestParam("accountId") long id){
        Optional<Customer> savedCustomer = customerService.create(id);
        if(!savedCustomer.isPresent()){
            return new ResponseEntity<>("Invalid Account Id", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(savedCustomer, HttpStatus.CREATED);
    }

    @GetMapping("")
    public ResponseEntity<?> getCustomer(@RequestParam("accountId") long accountId){
        Optional<Account> account = accountService.get(accountId);
        Optional<Customer> customer = customerService.getByAccount(account.get());

        if(!customer.isPresent()){
            return new ResponseEntity<>("No Customer Found", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(customer,HttpStatus.OK);
    }

    @PutMapping("")
    public ResponseEntity<?> updateCustomer(@Valid @RequestBody Customer customer, BindingResult result){
        if(result.hasErrors()) {
            return new ResponseEntity<>("Invalid Customer Object", HttpStatus.BAD_REQUEST);
        }

        Optional<?> savedCustomer = customerService.update(customer);
        if(!savedCustomer.isPresent())
            return new ResponseEntity<>("Customer Not Found", HttpStatus.NOT_FOUND);

        return new ResponseEntity<>(savedCustomer, HttpStatus.OK);
    }
}
