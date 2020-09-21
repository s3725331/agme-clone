import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createBooking} from "../../actions/bookingActions";
import axios from "axios";


export default class CurrentBooking extends Component {
  
  render() { 

    return (
        <div>
          <div className="row">
            <div className="col s12 m6 offset-m3">
              <div className="card">
                <div className="card-action blue darken-4 white-text">
                  <Link to="/Dashboard">
                    <span className="white-text text-darken-2 center-align">
                      <h3>Upcoming Bookings</h3>
                    </span>
                  </Link>
                </div>              
                <div className="card-content">
                  <h5><b>Your details</b></h5> <br></br>
                  <h6>Full name: John Smith</h6>
                  <h6>Email: address@email.com</h6> <br></br>

                  <div>
                    <h5><b>Booking details</b></h5> <br></br>
                    <div>   
                      <h6><b>Booking 1</b></h6>
                      <h6>Date of appointment: 22/09/2020</h6>
                      {/* <h6>Service: Consultancy</h6> */}
                      <h6>Worker: Michelle Obama</h6>
                      <h6>Start time: 10:00am</h6> 
                      <h6>End time: 10:30am</h6> <br></br>
                    </div>
                      <h6><b>Booking 2</b></h6>
                      <h6>Date of appointment: 27/09/2020</h6>
                      {/* <h6>Service: Consultancy</h6> */}
                      <h6>Worker: Will Smith</h6>
                      <h6>Start time: 11:00am</h6> 
                      <h6>End time: 11:30am</h6> <br></br>
                  </div>

                </div>  
              </div>          
            </div>
          </div>
        </div>     
      );
    }   
  }
  

