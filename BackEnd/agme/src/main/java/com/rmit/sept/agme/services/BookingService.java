package com.rmit.sept.agme.services;

import com.rmit.sept.agme.model.Booking;
import com.rmit.sept.agme.repositories.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class BookingService {
    @Autowired
    BookingRepository bookingRepository;

    private Booking saveOrUpdate(Booking booking){
        return bookingRepository.save(booking);
    }

    public Optional<Booking> get(long id){
        return bookingRepository.findById(id);
    }

    public Optional<Booking> create(Booking booking){
        return Optional.of(saveOrUpdate(booking));
    }

    public Optional<Booking> update(Booking booking){
        if(!bookingRepository.findById(booking.getId()).isPresent())
            return Optional.empty();

        return Optional.of(booking);
    }

    public Optional<Booking> cancel(long id){
        Optional<Booking> booking = bookingRepository.findById(id);

        if(!booking.isPresent()) {
            return Optional.empty();
        }

        booking.get().setCancelled(true);
        return Optional.of(bookingRepository.save(booking.get()));
    }

    public List<Booking> getByWorkerBetween(Long workerID, Date start, Date end){
        if(start == null){
            return bookingRepository.getPastByWorker(workerID, end);
        } else if(end == null) {
            return bookingRepository.getUpcomingByWorker(workerID, start);
        }
        return Collections.EMPTY_LIST;
    }

    public List<Booking> getByCustomerBetween(Long customerID, Date start, Date end){
        if(start == null){
            return bookingRepository.getPastByCustomer(customerID, end);
        } else if(end == null) {
            return bookingRepository.getUpcomingByCustomer(customerID, start);
        }
        return Collections.EMPTY_LIST;
    }


}
