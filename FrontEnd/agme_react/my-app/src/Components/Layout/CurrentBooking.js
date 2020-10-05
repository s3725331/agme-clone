import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { cancelBooking } from "../../actions/cancelBookingActions"


 class CurrentBooking extends Component {
  constructor(props) {
    super(props);
    var user;
    var accountType;

      //checks what kind of user is logged in and saves the user into the user variable
      //while also setting accountType appropriately

     if(localStorage.getItem('customerObject')!== null){ 
      user = JSON.parse(localStorage.getItem('customerObject'));
      accountType = "Customer";
     } 
     
     else if(localStorage.getItem('workerObject')!== null){ 
      
      user = JSON.parse(localStorage.getItem('workerObject'));
      accountType = "Worker";
     }

     
     //set state with current user

    this.state = {
      profile : user,
      book: null,
      cancelled: false,
      account: accountType,
      loaded: false
    };

    this.cancelling = this.cancelling.bind(this);

  }

  cancelling(bookId){
    var id = parseInt(bookId);
    this.props.cancelBooking(id, this,this.props.history);
   
  }


  async componentDidMount() {

    try{

      //if account type is of customer, gets all upcoming bookings with relevant customer id 
      //and stores the state else if account type is of worker, gets all  
      //upcoming bookings with relevant worker id and then sets loaded
      //state to true, which then renders the full page. 

      //if a booking object is not returned, book state stays null and loaded is set to true and page renders

      if(this.state.account === "Customer") {
        const res = await axios.get("http://localhost:8080/api/bookings/upcoming",{ params: { customerId :
        this.state.profile['id']}});
        console.log(res.data)
  
        this.setState({ book: res.data, loaded: true });

      } else if (this.state.account === "Worker") {

        const res = await axios.get("http://localhost:8080/api/bookings/upcoming",{ params: { workerId :
        this.state.profile['id']}});

        this.setState({ book: res.data, loaded: true });
      }
    }   catch (err) {  

        if(err.response.status === 404){
          this.setState({ loaded: true });

          }
    }
  }
  
  render() { 

    //used to load page only when relevant information has been gathered
    if (!this.state.loaded) {
      return null;
    }

    return (
        <div>
          <div className="row">
            <div className="col s12 m6 offset-m3">
              <div className="card" data-test="current-bookings">
                <div className="card-action blue darken-4 white-text">
                  <Link to="/Dashboard">
                    <span className="white-text text-darken-2 center-align">
                      <h3>Upcoming Bookings</h3>
                    </span>
                  </Link>
                </div>              
                <div className="card-content" data-test="account-details">
               {/*Conditional that checks account type and loads title accordingly */}

                {
                  (this.state.account === "Customer") ? 
                    (this.state.account === "Worker") ? null :
                      (<h5><b>Customer Details</b></h5> ):
                        (<h5><b>Worker Details</b></h5>)
                }
                
                <br></br>
               

                <h6>Full name:  {this.state.profile['account']['firstName']} {this.state.profile['account']['lastName']}</h6>
                <h6>Email:  {this.state.profile['account']['email']}</h6> <br></br>
                  <div data-test="booking-details">
                    <h5><b>Booking Details</b></h5> <br></br>

                    {/*Conditional that checks if booking is null. If null, loads message of bookings
                    not available. if Not null, checks logged in account type, and loads booking data 
                    according to either customer or worker */}

                    {
                      (this.state.book !== null) ? ( 
                        (this.state.account === "Customer") ? 
                          (this.state.account === "Worker") ? null:(
                            
                            this.state.book.map((book, index) => (
                        
                              <div key={book['id']} >   
                                <h6><b>Booking {index +1}</b> 
                                
                                {
                                  (book['cancelled'] !== true)? 
                                      null
                                  
                                  :(
                                    <b> --CANCELLED-- </b>
                                  )
                                }</h6>
                                <h6>Date of appointment: {book['startTime'].substring(0,10)}</h6>
                                {/* <h6>Service: Consultancy</h6> */}
                                <h6>Worker: {book['worker']['account']['firstName']} {book['worker']['account']['lastName']}</h6>
                                <h6>Service: {book['worker']['serviceName']['service']}</h6> 
                                <h6>Start time: {book['startTime'].substring(11)}</h6> 
                                <h6>End time: {book['endTime'].substring(11)}</h6> 

                                {
                                  (book['cancelled'] !== false)? null:(
                                    <button className="btn btn-cancel blue darken-4" onClick={this.cancelling.bind(this, book['id'])} >
                                    Cancel Booking
                                    </button> 
                                  )
                                }
                                
                                <br></br>
                                <br></br>
                                <br></br>
                              </div>
                            ))
                          ) : (
                          
                            this.state.book.map((book, index) => (
                      
                            <div key={book['id']} >   
                            <h6><b>Booking {index +1}</b> {
                              (book['cancelled'] !== true)? null:(
                                <b> --CANCELLED-- </b>
                              )
                            }</h6>
                              <h6>Date of appointment: {book['startTime'].substring(0,10)}</h6>
                              {/* <h6>Service: Consultancy</h6> */}
                              <h6>Customer: {book['customer']['account']['firstName']} {book['customer']['account']['lastName']}</h6>
                              <h6>Service: {book['worker']['serviceName']['service']}</h6> 
                              <h6>Start time: {book['startTime'].substring(11)}</h6> 
                              <h6>End time: {book['endTime'].substring(11)}</h6> 

                             {/* {
                                (book['cancelled'] !== false)? null:(
                                  <button className="btn btn-profile blue darken-4"    type="submit" >
                                  Cancel Booking
                                  </button> 
                                )
                              }
                            
                            */}
                              
                              <br></br>
                            </div>
                            ))
                          )) : (
                    
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
  
  CurrentBooking.propTypes = {
    cancelBooking: PropTypes.func.isRequired,
  };
  
  
  export default connect (
    null,
    {cancelBooking}
  )(CurrentBooking);
