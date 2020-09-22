import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createBooking} from "../../actions/bookingActions";
import axios from "axios";

 class Booking extends Component {
  constructor(props) {
    super(props);

    var customerObj;

    //gets and stores customer object from local storage. Used to add Customer details into booking
     if(localStorage.getItem('customerObject')!= null){ 
      customerObj = JSON.parse(localStorage.getItem('customerObject'));

     }
  
     

    this.state = {
      workers : null,
      worker : "",
      customer : customerObj,
      startDate: "",
      startTime: "",
      endTime: "",
      loaded: false
    };


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

    handleChange(e) {
       this.setState({ [e.target.name]: e.target.value });
   
  }




  handleSubmit(e) {
    e.preventDefault();

    //formats dates into database friendly pattern
    var starting = this.state.startDate+ " " + this.state.startTime+":00";
    var ending = this.state.startDate+ " " + this.state.endTime+":00";

    const newBooking = {
      customer : this.state.customer,
      worker : this.state.workers[this.state.worker],
      startTime : starting,
      endTime : ending
    }

   //creates a booking based on info provided in form
   this.props.createBooking(newBooking, this.props.history);

  }
  async componentDidMount() {

    //used to load information on all workers in database in order to give options to the customer
    //when choosing which worker they want to book

    //set loaded state to true if all workers have bee loaded or if no workers have been found 
    //in order to render page

    try{
    const res = await axios.get("http://localhost:8080/api/worker/all");
    this.setState({ workers: res.data, loaded: true });
    console.log(res.data)
    }    catch (err) {  


    if(err.response.status === 404){
      this.setState({ loaded: true });

  }
  }
  }

  
render() { 

  //used to render only after workers have been grabbed
  if (!this.state.loaded) {
    return null;
  }


    return (
      <div>
        <div className="row">
          <div className="col s12 m6 offset-m3">
            <div className="card">
              <div className="card-action blue darken-4 white-text">
                <Link to="/Dashboard">
                  <span className="white-text text-darken-2 center-align" data-test="booking-card">
                    <h3>Book your appointment</h3>
                  </span>
                </Link>
              </div>

              { <form onSubmit={this.handleSubmit}>

              <div className="card-content">
                <h6> Select a service</h6>
                  <div className="form-field">
                    <select className = "browser-default" name = "service"
                    value = "" onChange={this.handleChange} >
                        <option value="" disabled selected>Choose your option</option>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                        <option value="3">Option 3</option>
                    </select>
                  </div>
              </div>

              <div className="card-content">
                <h6> Select a worker</h6>
                  <div className="form-field">

                  {/* if workers exist, loop through each worker in the drop down menu for the form
                  if they dont exit, load message saying workers dont exist*/ }
                  { (this.state.workers === null) ? (
                    <h6> No workers available</h6>

                  ) :
                  <select  className = "browser-default" name = "worker"
                  value = {this.state.worker} onChange={this.handleChange}  required>

                        <option value = "" disabled selected>Choose your option</option>
                        {
                          
                          this.state.workers.map((worker, index) => (
                            <option key={worker['id']} value={index}> {worker['account']['firstName']} {worker['account']['lastName']}</option>
                          ))
                        }
                      
                    </select>
                      }
                  </div>
              </div>

              <div className="card-content">
                <h6> Choose your availability</h6>
                  <div className="form-field" >
                    <input type="date" className="datepicker"
                    name = "startDate"
                    value= {this.state.startDate}
                    onChange={this.handleChange}
                    required></input>
                  </div>
              </div>

              
              <div className="card-content">
                <h6> Pick Start time </h6>
                <div className="form-field" >
                <input type="time" className="timepicker"
                name = "startTime"
                value= {this.state.startTime}
                onChange={this.handleChange}
                required></input>
                </div>
                </div>   

                <div className="card-content">
                <h6> Pick End time </h6>
                <div className="form-field" >
                <input type="time" className="timepicker"
                name = "endTime"
                value= {this.state.endTime}
                onChange={this.handleChange}
                required></input>
              </div>
              </div>  


                <div className="col s12 m6 offset-m3">
                  <button className="btn btn-form blue darken-4" type="submit">
                    Book
                  </button>
                </div>

                <div className="card-content center-align"></div>
              </form> }
            </div>          
          </div>
        </div>
      </div>     
    );
  }   
}
Booking.propTypes = {
  createBooking: PropTypes.func.isRequired
};

//const stateToProps = (state) =>{
 // return {
    
 // }
//}

export default connect (null, {createBooking})(Booking);