package com.rmit.sept.agme.repositories;

import com.rmit.sept.agme.model.Booking;
import com.rmit.sept.agme.model.Customer;
import com.rmit.sept.agme.model.Worker;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface BookingRepository extends CrudRepository<Booking, Long> {

    @Query("SELECT b FROM Booking b WHERE b.worker = (:workerID) AND b.startTime > (:time)")
    List<Booking> getUpcomingByWorker(@Param("workerID")long workerID, @Param("time") Date time);

    @Query("SELECT b FROM Booking b WHERE b.customer = (:customerID) AND b.startTime > (:time)")
    List<Booking> getUpcomingByCustomer(@Param("customerID")long customerID, @Param("time") Date time);

    @Query("SELECT b FROM Booking b WHERE b.worker = (:workerID) AND b.startTime < (:time)")
    List<Booking> getPastByWorker(@Param("workerID")long workerID, @Param("time") Date time);

    @Query("SELECT b FROM Booking b WHERE b.customer = (:customerID) AND b.startTime < (:time)")
    List<Booking> getPastByCustomer(@Param("customerID") long customerID, @Param("time") Date time);
}
