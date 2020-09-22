import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


export default class PastBooking extends Component {
  constructor(props) {
    super(props);
    var user;

     if(localStorage.getItem('customerObject')!= null){ 
      user = JSON.parse(localStorage.getItem('customerObject'));
     }

     

     

    this.state = {
      profile : user,
      book: null,
      loaded: false
    };
    //console.log(this.state.customer)
  }



  async componentDidMount() {
    try{
    const res = await axios.get("http://localhost:8080/api/bookings/past",{ params: { customerId :
    this.state.profile['id']}});

    this.setState({ book: res.data, loaded: true });
    }    catch (err) {  


    if(err.response.status === 404){
      this.setState({ loaded: true });

  }
  }
  }
  
  render() { 
    if (!this.state.loaded) {
      return null;
  }

    return (
        <div>
          <div className="row">
            <div className="col s12 m6 offset-m3">
              <div className="card" data-test="past-bookings-card">
                <div className="card-action blue darken-4 white-text">
                  <Link to="/Dashboard">
                    <span className="white-text text-darken-2 center-align">
                      <h3>Past Bookings</h3>
                    </span>
                  </Link>
                </div>              
                <div className="card-content" data-test="account-details">
                <h5><b>Your details</b></h5> <br></br>
                <h6>Full name:  {this.state.profile['account']['firstName']} {this.state.profile['account']['lastName']}</h6>
                <h6>Email:  {this.state.profile['account']['email']}</h6> <br></br>

                <div data-test="booking-details">
                  <h5><b>Booking details</b></h5> <br></br>
                  {
                    (this.state.book != null) ? 
                    this.state.book.map((book, index) => (
                    
                  <div key={book['id']} >   
                    <h6><b>Booking {index +1}</b></h6>
                    
                    
                    <h6>Date of appointment: {book['startTime'].substring(0,10)}</h6>
                    
                    {/* <h6>Service: Consultancy</h6> */}
                    <h6>Worker: {book['worker']['account']['firstName']} {book['worker']['account']['lastName']}</h6>
                    <h6>Start time: {book['startTime'].substring(11)}</h6> 
                    <h6>End time: {book['endTime'].substring(11)}</h6> <br></br>
                  </div>
                  )): (
                  
                      <h6><b>No bookings available</b></h6>
                  
                      )
                 }
                </div>

              </div>  
              </div>          
            </div>
          </div>
        </div>     
      );
    }   
  }
  

