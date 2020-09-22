import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class LoggedInDashboard extends Component {
  render() {
    if( localStorage.getItem("workerObject") != null){
      return (
        <div>
        </div>
      )
    }

    return (
      <div className="loggedInComponent" data-test="logged-in-dashboard">
        <div class="container">
          <div class="row">
            <div class="col l8 s12">
                <h3>
                  <b>Looking to Book?</b>
                </h3>
                <h5>
                  <b>
                    Start booking with the best services.
                  </b>
                </h5>
                <Link to="/Booking" data-test="book-btn">
                  <button className="btn btn-book blue darken-4" 
                    data-test="sign-up-button"
                    type="submit">
                    Book Now
                  </button>
                </Link>
              </div> 
                <div className="col l4 s12">
                    <h5>
                      <b>
                      OR
                      </b>
                    </h5>
                    <h5>
                      <b>
                      Already booked?
                      </b>
                    </h5>
                    
                    <Link to="/CurrentBooking">
                    <button className="btn btn-bookings blue darken-4" 
                      data-test="sign-up-button"
                      type="submit">
                      Upcoming appointments
                    </button>
                    </Link>

                    <h6><b></b></h6>

                    <Link to="/PastBooking">
                      <button className="btn btn-bookings blue darken-4" 
                        data-test="sign-up-button"
                        type="submit">
                        Past Bookings
                      </button>
                    </Link>
                  </div>                    
            </div>            
        </div>
      </div>
    );
  }
}
