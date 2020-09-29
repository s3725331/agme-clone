package com.rmit.sept.agme;

import com.rmit.sept.agme.model.*;
import com.rmit.sept.agme.repositories.AccountRepository;
import com.rmit.sept.agme.repositories.CustomerRepository;
import com.rmit.sept.agme.repositories.WorkerRepository;
import com.rmit.sept.agme.services.CustomerService;
import com.rmit.sept.agme.services.BookingService;
import com.rmit.sept.agme.repositories.BookingRepository;
import com.rmit.sept.agme.services.ServiceNameService;
import com.rmit.sept.agme.services.WorkerService;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Date;

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

    @Autowired
    ServiceNameService serviceNameService;

    ServiceName mockService;

    @BeforeAll
    public void setUp(){
        serviceNameService.create("Service Name");
        mockService = serviceNameService.getByService("Service Name").iterator().next();
    }


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
        workerService.create(newWorker.getId(), mockService);
        Booking book = new Booking();
        Customer custom = customerRepository.save(new Customer(newCustomer));
        Worker worker = workerRepository.save(new Worker(newWorker));
        book.setCustomer(custom);
        book.setWorker(worker);
        book.setStartTime(new Date());
        book.setEndTime(new Date());
        Booking newBooking = bookingRepository.save(book);
        
        assertTrue(bookingService.create(newBooking).isPresent());
    }
    
    @Test
    public void testCancelBooking() {
    	Account cust = new Account();
    	cust.setAddress("13 realplace drive, suburbs");
        cust.setEmail("Juan@mail.com");
        cust.setFirstName("Juan");
        cust.setLastName("Rosso");
        cust.setPassword("password");
    	Account getCustomer = accountRepository.save(cust);
    	customerService.get(getCustomer.getId());
    	
    	Account work = new Account();
        work.setAddress("31 fakeplace drive, suburbs");
        work.setEmail("Jose@mail.com");
        work.setFirstName("Jose");
        work.setLastName("Azurro");
        work.setPassword("wordpass");
        Account getWorker = accountRepository.save(work);
        workerService.get(getWorker.getId());
    	
        Booking booking = new Booking();
        Customer custom = customerRepository.save(new Customer(getCustomer));
        Worker worker = workerRepository.save(new Worker(getWorker));
        booking.setCustomer(custom);
        booking.setWorker(worker);
        booking.setStartTime(new Date());
        booking.setEndTime(new Date());
        Booking cancelBooking = bookingRepository.save(booking);
        
        assertTrue(bookingService.cancel(cancelBooking.getId()).isPresent());
    }
    
    @Test
    public void testUpdateBooking() {
    	Account cust = new Account();
    	cust.setAddress("13 realplace drive, suburbs");
        cust.setEmail("Juan@mail.com");
        cust.setFirstName("Juan");
        cust.setLastName("Rosso");
        cust.setPassword("password");
    	Account getCustomer = accountRepository.save(cust);
    	customerService.get(getCustomer.getId());
    	
    	Account work = new Account();
        work.setAddress("31 fakeplace drive, suburbs");
        work.setEmail("Jose@mail.com");
        work.setFirstName("Jose");
        work.setLastName("Azurro");
        work.setPassword("wordpass");
        Account getWorker = accountRepository.save(work);
        workerService.get(getWorker.getId());
   
        Booking booking = new Booking();
        Customer custom = customerRepository.save(new Customer(getCustomer));
        Worker worker = workerRepository.save(new Worker(getWorker));
        booking.setCustomer(custom);
        booking.setWorker(worker);
        booking.setStartTime(new Date());
        booking.setEndTime(new Date());
        Booking updateBooking = bookingRepository.save(booking);
        
        assertTrue(bookingService.update(updateBooking).isPresent());
    }
    
    @Test
    public void testValidBookingGet() {
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
        workerService.create(newWorker.getId(), mockService);
        
        Booking book = new Booking();
        Customer custom = customerRepository.save(new Customer(newCustomer));
        Worker worker = workerRepository.save(new Worker(newWorker));
        book.setCustomer(custom);
        book.setWorker(worker);
        book.setStartTime(new Date());
        book.setEndTime(new Date());
        Booking newBooking = bookingRepository.save(book);
        
        assertTrue(bookingService.get(newBooking.getId()).isPresent());
    }
    
    @Test
    public void testInvalidBookingGet() {
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
        workerService.create(newWorker.getId(), mockService);
        
        Booking book = new Booking();
        Customer custom = customerRepository.save(new Customer(newCustomer));
        Worker worker = workerRepository.save(new Worker(newWorker));
        book.setCustomer(custom);
        book.setWorker(worker);
        book.setStartTime(new Date());
        book.setEndTime(new Date());
        Booking newBooking = bookingRepository.save(book);
        
        assertFalse(bookingService.get(67890).isPresent());  	
    }
}
