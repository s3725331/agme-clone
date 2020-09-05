package com.rmit.sept.agme;

import com.rmit.sept.agme.model.Account;
import com.rmit.sept.agme.model.Booking;
import com.rmit.sept.agme.model.Customer;
import com.rmit.sept.agme.model.Worker;
import com.rmit.sept.agme.repositories.AccountRepository;
import com.rmit.sept.agme.repositories.CustomerRepository;
import com.rmit.sept.agme.repositories.WorkerRepository;
import com.rmit.sept.agme.services.CustomerService;
import com.rmit.sept.agme.services.BookingService;
import com.rmit.sept.agme.repositories.BookingRepository;
import com.rmit.sept.agme.services.WorkerService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class BookingServiceTests {

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    CustomerService customerService;

    @Autowired
    WorkerRepository workerRepository;

    @Autowired
    WorkerService workerService;

    @Autowired
    BookingRepository bookingRepository;

    @Autowired
    BookingService bookingService;

    @Test
    public void testValidBookingCreate() {
        Account cust = new Account();
        cust.setAddress("13 realplace drive, suburbs");
        cust.setEmail("Juan@mail.com");
        cust.setFirstName("Juan");
        cust.setLastName("Rosso");
        cust.setPassword("password");
        Account newCustomer = accountRepository.save(cust);
        customerService.create(newCustomer.getId());
        Account work = new Account();
        work.setAddress("31 fakeplace drive, suburbs");
        work.setEmail("Jose@mail.com");
        work.setFirstName("Jose");
        work.setLastName("Azurro");
        work.setPassword("wordpass");
        Account newWorker = accountRepository.save(work);
        workerService.create(newWorker.getId());
        Booking book = new Booking();
        Customer custom = customerRepository.save(new Customer(newCustomer));
        Worker worker = workerRepository.save(new Worker(newWorker));
        book.setCustomer(custom);
        book.setWorker(worker);
        Booking newBooking = bookingRepository.save(book);
        assertTrue(bookingService.create(newBooking).isPresent());
    }
}
