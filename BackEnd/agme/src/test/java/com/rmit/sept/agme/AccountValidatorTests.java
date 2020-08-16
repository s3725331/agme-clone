package com.rmit.sept.agme;

import com.rmit.sept.agme.model.Account;
import org.junit.Before;
import org.junit.Test;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.Set;

import static org.junit.Assert.assertFalse;

public class AccountValidatorTests {
    private Validator validator;

    @Before
    public void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }
    @Test
    public void testContactSuccess() {

        Account contact = new Account();
        contact.setEmail("hi@gmail.com");
        contact.setFirstName("Jack");
        Set<ConstraintViolation<Account>> violations = validator.validate(contact);
        assertFalse(violations.isEmpty());
    }
}
