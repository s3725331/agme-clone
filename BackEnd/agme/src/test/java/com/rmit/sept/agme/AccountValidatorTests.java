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
import static org.junit.Assert.assertTrue;

public class AccountValidatorTests {
    private Validator validator;

    @Before
    public void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
        }

        @Test
        public void testAccountSuccess() {
            Account contact = new Account();
            contact.setEmail("sam@gmail.com");
            contact.setPassword("Password123");
            contact.setFirstname("Sam");
            contact.setLastname("Brooks");
            contact.setAddress("24 York Street Sunshine");
            Set<ConstraintViolation<Account>> violations = validator.validate(contact);
            assertTrue(violations.isEmpty());
        }

        @Test
        public void testAccountPasswordTooShortFailure() {
            Account contact = new Account();
            contact.setEmail("sam@gmail.com");
            contact.setPassword("Pa");
            contact.setFirstname("Sam");
            contact.setLastname("Brooks");
            contact.setAddress("24 York Street Sunshine");
            Set<ConstraintViolation<Account>> violations = validator.validate(contact);
            assertFalse(violations.isEmpty());
        }

        @Test
        public void testAccountPasswordTooLongFailure() {
            Account contact = new Account();
            contact.setEmail("sam@gmail.com");
            contact.setPassword("passwrodcarbustrucksshcwoaodnssseodddgsjskfhsgahdjsjshsjfhcgshcj123");
            contact.setFirstname("Sam");
            contact.setLastname("Brooks");
            contact.setAddress("24 York Street Sunshine");
            Set<ConstraintViolation<Account>> violations = validator.validate(contact);
            assertFalse(violations.isEmpty());
        }

        @Test
        public void testAccountPasswordFieldBlankFailure() {
            Account contact = new Account();
            contact.setEmail("sam@gmail.com");
            contact.setFirstname("Sam");
            contact.setLastname("Brooks");
            contact.setAddress("24 York Street Sunshine");
            Set<ConstraintViolation<Account>> violations = validator.validate(contact);
            assertFalse(violations.isEmpty());
        }

        @Test
        public void testAccountEmailFailure() {
            Account contact = new Account();
            contact.setEmail("samgmail.com");
            contact.setPassword("Password123");
            contact.setFirstname("Sam");
            contact.setLastname("Brooks");
            contact.setAddress("24 York Street Sunshine");
            Set<ConstraintViolation<Account>> violations = validator.validate(contact);
            assertFalse(violations.isEmpty());
        }

        @Test
        public void testAccountFirstNameEmpty() {
            Account contact = new Account();
            contact.setEmail("sam@gmail.com");
            contact.setPassword("Password123");
            contact.setFirstname("");
            contact.setLastname("Brooks");
            contact.setAddress("24 York Street Sunshine");
            Set<ConstraintViolation<Account>> violations = validator.validate(contact);
            assertFalse(violations.isEmpty());
        }

        @Test
        public void testAccountAddressTooShortFailure() {
            Account contact = new Account();
            contact.setEmail("sam@gmail.com");
            contact.setPassword("Password123");
            contact.setFirstname("Sam");
            contact.setLastname("Brooks");
            contact.setAddress("qw");
            Set<ConstraintViolation<Account>> violations = validator.validate(contact);
            assertFalse(violations.isEmpty());
        }

        @Test
        public void testAccountAddressTooLongFailure() {
            Account contact = new Account();
            contact.setEmail("sam@gmail.com");
            contact.setPassword("Password123");
            contact.setFirstname("Sam");
            contact.setLastname("Brooks");
            contact.setAddress("qwdgdgdgdgddgdghjiwfweufbbcjsnubwefyujdhwydhakxjadyhwhudkhadhjsjdhfefwefw" +
                    "dfffffffffffsfdsfsfsdfsfsdfsfsfsfsdfsdfsfsfsfsdfsdfsdfsdfefewfwefwefwefwfwfwefwefwefwefwf Toorak");
            Set<ConstraintViolation<Account>> violations = validator.validate(contact);
            assertFalse(violations.isEmpty());
        }

        @Test
        public void testAccountAddressBlankFailure() {
            Account contact = new Account();
            contact.setEmail("sam@gmail.com");
            contact.setPassword("Password123");
            contact.setFirstname("Sam");
            contact.setLastname("Brooks");
            Set<ConstraintViolation<Account>> violations = validator.validate(contact);
            assertFalse(violations.isEmpty());
        }

        @Test
        public void testAccountEmailBlankFailure() {
            Account contact = new Account();
            contact.setPassword("Password123");
            contact.setFirstname("Sam");
            contact.setLastname("Brooks");
            contact.setAddress("24 York Street Sunshine");
            Set<ConstraintViolation<Account>> violations = validator.validate(contact);
            assertFalse(violations.isEmpty());
        }
}
