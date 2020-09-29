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
@CrossOrigin
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @Autowired
    private AccountService accountService;

    //Create customer from new account
    //First, the new account is created and saved
    //A new customer is then created and saved with new object
    @PostMapping("/account")
    public ResponseEntity<?> createCustomerAccount(@Valid @RequestBody Account account, BindingResult result){
        if(result.hasErrors()) { //Invalid account object in request body
            return new ResponseEntity<>("Invalid Accounts Object", HttpStatus.BAD_REQUEST);
        }

        //Create account in repo
        Optional<Account> savedAccount = accountService.create(account);
        if(!savedAccount.isPresent()){ //Non unique email
            return new ResponseEntity<>("Invalid Email", HttpStatus.CONFLICT);
        }

        //Create new customer with account in repo
        Optional<Customer> savedCustomer = customerService.create(savedAccount.get().getId());
        if(!savedCustomer.isPresent()){
            return new ResponseEntity<>("Invalid Account Id", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(savedCustomer, HttpStatus.CREATED); //new customer returned
    }

    //Create new customer from existing account
    @PostMapping("")
    public ResponseEntity<?> createCustomer(@RequestParam("accountId") long id){
        //Customer created from existing account in repo
        Optional<Customer> savedCustomer = customerService.create(id);

        if(!savedCustomer.isPresent()){ //No account saved with accountId
            return new ResponseEntity<>("Invalid Account Id", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(savedCustomer, HttpStatus.CREATED); //New customer returned
    }

    //Get customer by its account id
    @GetMapping("")
    public ResponseEntity<?> getCustomer(@RequestParam("accountId") long accountId){
        //Get account from repo
        Optional<Account> account = accountService.get(accountId);
        if(!account.isPresent()){ //No account saved with accountId
            return new ResponseEntity<>("Invalid Account Id", HttpStatus.NOT_FOUND);
        }

        //Get customer by account from repo
        Optional<Customer> customer = customerService.getByAccount(account.get());
        if(!customer.isPresent()){
            return new ResponseEntity<>("No Customer Found", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(customer,HttpStatus.OK); //Customer from repo returned
    }

    @PutMapping("")
    public ResponseEntity<?> updateCustomer(@Valid @RequestBody Customer customer, BindingResult result){
        if(result.hasErrors()) { //Invalid customer object in request body
            return new ResponseEntity<>("Invalid Customer Object", HttpStatus.BAD_REQUEST);
        }

        //Update worker account in repo
        Optional<Account> savedAccount = accountService.update(customer.getAccount());
        if(!savedAccount.isPresent()) //Bad account (bad id or non unique email)
            return new ResponseEntity<>("Bad Account", HttpStatus.NOT_FOUND);

        //Customer updated in repo
        Optional<Customer> savedCustomer = customerService.update(customer);
        if(!savedCustomer.isPresent()) //No customer found
            return new ResponseEntity<>("Customer Not Found", HttpStatus.NOT_FOUND);

        return new ResponseEntity<>(savedCustomer, HttpStatus.OK); //Updated customer returned
    }
}
