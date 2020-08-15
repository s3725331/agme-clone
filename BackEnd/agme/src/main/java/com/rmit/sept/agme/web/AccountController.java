package com.rmit.sept.agme.web;

import com.rmit.sept.agme.model.Account;
import com.rmit.sept.agme.model.Customer;
import com.rmit.sept.agme.services.AccountService;
import com.rmit.sept.agme.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/user")
public class AccountController {
    @Autowired
    private AccountService accountService;

    @PostMapping("")
    public ResponseEntity<?> createUser(@Valid @RequestBody Account account, BindingResult result){
        if(result.hasErrors()) {
            return new ResponseEntity<>("Invalid Customer Object", HttpStatus.BAD_REQUEST);
        }

        Account savedAccount = accountService.saveOrUpdate(account);
        return new ResponseEntity<>(savedAccount, HttpStatus.CREATED);
    }
}
