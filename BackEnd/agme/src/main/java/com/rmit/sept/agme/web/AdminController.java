package com.rmit.sept.agme.web;

import com.rmit.sept.agme.model.Account;
import com.rmit.sept.agme.model.Admin;
import com.rmit.sept.agme.services.AccountService;
import com.rmit.sept.agme.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin
public class AdminController {
    @Autowired
    private AdminService adminService;

    @Autowired
    private AccountService accountService;

    //Get customer by its account id
    @GetMapping("")
    public ResponseEntity<?> getCustomer(@RequestParam("accountId") long accountId){
        //Get account from repo
        Optional<Account> account = accountService.get(accountId);
        if(!account.isPresent()){ //No account saved with accountId
            return new ResponseEntity<>("Invalid Account Id", HttpStatus.NOT_FOUND);
        }

        //Get customer by account from repo
        Optional<Admin> admin = adminService.getByAccount(account.get());
        if(!admin.isPresent()){
            return new ResponseEntity<>("No Admin Found", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(admin,HttpStatus.OK); //Customer from repo returned
    }

}