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
@RequestMapping("/api/accounts")
@CrossOrigin
public class AccountController {
    @Autowired
    private AccountService accountService;

    @PostMapping("")
    public ResponseEntity<?> createAccount(@Valid @RequestBody Account account, BindingResult result){
        if(result.hasErrors()) { //Invalid account object in request body
            return new ResponseEntity<>("Invalid Accounts Object", HttpStatus.BAD_REQUEST);
        }

        //Create new account in repo
        Optional<Account> savedAccount = accountService.create(account);
        if(!savedAccount.isPresent()){ //Email non-unique
            return new ResponseEntity<>("Invalid Email", HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>(savedAccount, HttpStatus.CREATED); //Saved account returned
    }

    //Get account by id or by email (as email is also unique
    @GetMapping("")
    public ResponseEntity<?> getAccount(@RequestParam(value = "id", required = false) Long id,
                                        @RequestParam(value = "email", required = false) String email){
        Optional<Account> account;

        if(id != null && email == null) {
            account = accountService.get(id); //Get account from repo by id

        } else if(id == null && email != null){
            account = accountService.getByEmail(email); //Get account from repo by email
            
        } else { //Invalid request params
            return new ResponseEntity<>("Bad Request", HttpStatus.BAD_REQUEST);
        }

        if (!account.isPresent()) { //No account found in repo
            return new ResponseEntity<>("No account found", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(account, HttpStatus.OK); //Found account returned
    }

    @PutMapping("")
    public ResponseEntity<?> updateAccount(@Valid @RequestBody Account account, BindingResult result){
        if(result.hasErrors()) { //Invalid account object in request body
            return new ResponseEntity<>("Invalid Account Object", HttpStatus.BAD_REQUEST);
        }

        //Update account object in repo
        Optional<Account> savedAccount = accountService.update(account);
        if(!savedAccount.isPresent())
            return new ResponseEntity<>("Account Not Found", HttpStatus.NOT_FOUND);

        return new ResponseEntity<>(savedAccount, HttpStatus.OK); //Updated account object returned
    }


}
