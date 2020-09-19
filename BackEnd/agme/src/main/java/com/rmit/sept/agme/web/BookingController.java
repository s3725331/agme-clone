package com.rmit.sept.agme.web;

import com.rmit.sept.agme.model.Booking;
import com.rmit.sept.agme.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    @Autowired
    BookingService bookingService;

    @PostMapping("")
    public ResponseEntity<?> createBooking(@Valid @RequestBody Booking booking, BindingResult result){
        if(result.hasErrors()) {
            return new ResponseEntity<>("Invalid Bookings Object", HttpStatus.BAD_REQUEST);
        }

        Optional<Booking> savedBooking = bookingService.create(booking);
        if(!savedBooking.isPresent()){
            return new ResponseEntity<>("Invalid Booking", HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>(savedBooking, HttpStatus.CREATED);
    }

    @GetMapping("")
    public ResponseEntity<?> getBooking(@RequestParam("id") long id){
        Optional<Booking> booking = bookingService.get(id);

        if(!booking.isPresent()){
            return new ResponseEntity<>("No Booking Found", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(booking,HttpStatus.OK);
    }

    @PutMapping("")
    public ResponseEntity<?> updateBooking(@Valid @RequestBody Booking booking, BindingResult result){
        if(result.hasErrors()) {
            return new ResponseEntity<>("Invalid Booking Object", HttpStatus.BAD_REQUEST);
        }

        Optional<?> savedBooking = bookingService.update(booking);
        if(!savedBooking.isPresent())
            return new ResponseEntity<>("Booking Not Found", HttpStatus.NOT_FOUND);

        return new ResponseEntity<>(savedBooking, HttpStatus.OK);
    }

    @GetMapping("/upcoming")
    public ResponseEntity<?> getUpcomingBookings(@RequestParam(value = "workerId", required = false) Long workerID,
                                               @RequestParam(value = "customerId", required = false) Long customerID){
        if(workerID != null && customerID == null){
            Iterable<Booking> bookings = bookingService.getByWorkerBetween(workerID, new Date(), null);
            return new ResponseEntity<>(bookings, HttpStatus.OK);
        } else if(workerID == null && customerID != null){
            Iterable<Booking> bookings = bookingService.getByCustomerBetween(customerID, new Date(), null);
            return new ResponseEntity<>(bookings, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>("Bad Request", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/past")
    public ResponseEntity<?> getPastBookings(@RequestParam(value = "workerId", required = false) Long workerID,
                                                 @RequestParam(value = "customerId", required = false) Long customerID){
        if(workerID != null && customerID == null){
            Iterable<Booking> bookings = bookingService.getByWorkerBetween(workerID, null, new Date());
            return new ResponseEntity<>(bookings, HttpStatus.OK);
        } else if(workerID == null && customerID != null){
            Iterable<Booking> bookings = bookingService.getByCustomerBetween(customerID, null, new Date());
            return new ResponseEntity<>(bookings, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>("Bad Request", HttpStatus.BAD_REQUEST);
        }
    }

}
