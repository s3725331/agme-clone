import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class LoggedInDashboard extends Component {
  render() {
    return (
      <div className="loggedInComponent" data-test="logged-in-dashboard">
        <div class="container">
          <div class="row">
            <div class="col l10 s12">
              <h3>
                <b>Looking to Book?</b>
              </h3>
              <h5><b>
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
          </div>
        </div>
      </div>
    );
  }
}
