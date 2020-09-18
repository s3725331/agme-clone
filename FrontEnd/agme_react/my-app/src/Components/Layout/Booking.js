import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

export default class Booking extends Component {
  // componentDidMount() {
  //     const M = window.M;
  //     const select = document.querySelectorAll(".select");
  //     M.FormSelect.init(select, options);
  //   }
  
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
                    <select className = "browser-default" required>
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
                  <select className = "browser-default" required>
                        <option value="" disabled selected>Choose your option</option>
                        <option value="1" data-icon="images/face1.jpg">Option 1</option>
                        <option value="2">Option 2</option>
                        <option value="3">Option 3</option>
                    </select>
                  </div>
              </div>

              <div className="card-content">
                <h6> Choose your availability</h6>
                  <div className="form-field" required>
                    <input type="date" class="datepicker" required></input>
                  </div>
              </div>

              
              <div className="card-content">
                <h6> Pick your time </h6>
                <select className = "browser-default" required >
                        <option value="" disabled selected>Select a time</option>
                        <option value="1" data-icon="images/face1.jpg">10:30am</option>
                        <option value="2">2:30pm</option>
                        <option value="3">4:20pm</option>
                    </select>
                    
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
