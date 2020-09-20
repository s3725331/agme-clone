import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createBooking} from "../../actions/bookingActions";
import axios from "axios";

 class Booking extends Component {
  constructor(props) {
    super(props);

    var workerStore;
    var customerObj;


     if(localStorage.getItem('workerStorage')!= null){ 
       workerStore = JSON.parse(localStorage.getItem('workerStorage'));
  
      }

     if(localStorage.getItem('customerObject')!= null){ 
      customerObj = JSON.parse(localStorage.getItem('customerObject'));

     }

    // workerStore = this.props.currentUser;

     if(workerStore == null){
       workerStore = [{id:"0",
       account : {
      firstName:"null",
      lastName:"null"}
      }]
     }

     

    this.state = {

      workers : workerStore,
      worker : "",
      customer : customerObj,
      startDate: "",
      startTime: "",
      endTime: ""
    };
    //console.log(this.state.workers[0]['account']['firstName'])

   // var select = document.getElementById("selectNumber");
   // var options = ["1", "2", "3", "4", "5"];
   // for(var i = 0; i < options.length; i++) {
    //    var opt = options[i];
    //    var el = document.createElement("option");
    //    el.textContent = opt;
     //   el.value = opt;
     //   select.appendChild(el);
   // }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

    handleChange(e) {
       this.setState({ [e.target.name]: e.target.value });

  }




  handleSubmit(e) {
    e.preventDefault();
    var starting = this.state.startDate+ " " + this.state.startTime+":00";
    var ending = this.state.startDate+ " " + this.state.endTime+":00";

    const newBooking = {
      customer : this.state.customer,
      worker : this.state.workers[this.state.worker],
      startTime : starting,
      endTime : ending
    }
    console.log(starting)
    console.log(ending)
   console.log(newBooking);
   this.props.createBooking(newBooking, this.props.history);

  }

  test(){

    if(localStorage.getItem('workerStorage')!= null){ 
     const storage = JSON.parse(localStorage.getItem('workerStorage'));
     return storage;
 
    } else{
      return null;
    }
    
   }



  
render() { 

    return (
      <div>
        <div className="row">
          <div className="col s12 m6 offset-m3">
            <div className="card">
              <div className="card-action blue darken-4 white-text">
                <Link to="/Dashboard">
                  <span className="white-text text-darken-2 center-align">
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
                  <select  className = "browser-default" name = "worker"
                  value = {this.state.worker} onChange={this.handleChange}  required>

                        <option value = "" disabled selected>Choose your option</option>
                        {
                          
                          this.state.workers.map((worker, index) => (
                            <option key={worker['id']} value={index}> {worker['account']['firstName']} {worker['account']['lastName']}</option>
                          ))
                        }

                    </select>
                  </div>
              </div>

              <div className="card-content">
                <h6> Choose your availability</h6>
                  <div className="form-field" >
                    <input type="date" className="datepicker"
                    name = "startDate"
                    value= {this.state.startDate}
                    onChange={this.handleChange}
                    reqired></input>
                  </div>
              </div>

              
              <div className="card-content">
                <h6> Pick Start time </h6>
                <div className="form-field" >
                <input type="time" className="timepicker"
                name = "startTime"
                value= {this.state.startTime}
                onChange={this.handleChange}
                ></input>
                </div>
                </div>   

                <div className="card-content">
                <h6> Pick End time </h6>
                <div className="form-field" >
                <input type="time" className="timepicker"
                name = "endTime"
                value= {this.state.endTime}
                onChange={this.handleChange}
                ></input>
              </div>
              </div>  


                <div className="col s12 m6 offset-m3">
                  <button className="btn btn-block blue darken-4" type="submit">
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
  //getWorkers: PropTypes.func.isRequired
};

//const stateToProps = (state) =>{
  //return {
    //currentUser : state.currentUser
  //}
//}


//export default connect (null, {getWorkers})(Booking);

export default connect (null, {createBooking})(Booking);