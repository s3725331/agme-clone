import React, { Component } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbars/MainNavbar/MainNavbar";
import axios from "axios";

export default class Account extends Component {
  constructor(props) {
    super(props);
    var user;
    var accountType;

    //checks what kind of user is logged in and saves the user into the user variable
    //while also setting accountType appropriately

    if (localStorage.getItem("customerObject") != null) {
      user = JSON.parse(localStorage.getItem("customerObject"));
      accountType = "Customer";
    } else if (localStorage.getItem("workerObject") != null) {
      user = JSON.parse(localStorage.getItem("workerObject"));
      accountType = "Worker";
    }

    //set state with current user

    this.state = {
      profile: user,
      account: accountType,
      loaded: false,
      editStatus: false,
      email: user["account"]["email"],
      firstName: user["account"]["firstName"],
      lastName: user["account"]["lastName"],
      address: user["account"]["address"]
    };

    this.setEditFalse = this.setEditFalse.bind(this);
    this.setEditTrue = this.setEditTrue.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const newAccount = {

    }

  }


  setEditTrue(){
    this.setState({ editStatus: true });
  }



  setEditFalse(){
    this.setState({ editStatus: false });
 
  }

  render() {

    if(this.state.editStatus){
      return (
        <div>
          <Navbar />
          <div className="row">
            <div className="account-card">
              <div className="col s6 push-s3">
                <div className="card" data-test="card">
                  <div className="card-action blue darken-4 white-text center-align">
                    <h4>
                      <b>Account Overview</b>
                    </h4>
                  </div>
                  <div class="row">
                    <div className="card-content">
                      <div className="col s3">
                        <h6>
                          <b>Profile</b>
                        </h6>
                      </div>
                    </div>


                    <div className="card-content">
                    <h6> Edit Email</h6>
                    <div data-test="email-field">
                      <input
                        type="email"
                        name="email"
                        value= {this.state.email}
                        onChange={this.handleChange}
                      ></input>
                      <span
                        className="helper-text"
                        data-error="This email is invalid. Please make sure it's formatted like example@email.com"
                        data-success=""
                      ></span>
                    </div>
                  </div>

        
                  <div className="card-content">
                    <h6>Edit First Name</h6>
                    <div data-test="first-name-field">
                      <input
                        placeholder="Enter your First Name."
                        type="text"
                        className="validate"
                        name = "firstName"
                        value= {this.state.firstName}
                        onChange={this.handleChange}
                      ></input>
                    </div>
                  </div>
    
                  <div className="card-content">
                    <h6>Edit Last Name</h6>
                    <div data-test="last-name-field">
                      <input
                        placeholder="Enter your last name."
                        type="text"
                        name = "lastName"
                        value= {this.state.lastName}
                        className="validate"
                        onChange={this.handleChange}
                      ></input>
                    </div>
                  </div>
    
                  <div className="card-content">
                    <h6> Edit Address</h6>
                    <div data-test="address-field">
                      <input
                        placeholder="Enter Address."
                        type="text"
                        className="validate"
                        name = "address"
                        value= {this.state.address}
                        onChange={this.handleChange}
                      ></input>
                    </div>
                  </div>
    
    
                  <div className="card-content">
  
                  
  
                  <button className="btn btn-profile blue darken-4"    type="submit" onClick={this.setEditFalse} >
                  Save Profile
                  
                </button> 



                </div>




                    </div>

                    <div className="card-content"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
      );

    }
    
   
    return (
      <div>
        <Navbar />
        <div className="row">
          <div className="account-card">
            <div className="col s6 push-s3">
              <div className="card" data-test="card">
                <div className="card-action blue darken-4 white-text center-align">
                  <h4>
                    <b>Account Overview</b>
                  </h4>
                </div>
                <div class="row">
                  <div className="card-content">
                    <div className="col s3">
                      <h6>
                        <b>Profile</b>
                      </h6>
                    </div>
                  </div>
                  <div className="card-content">
                    <div className="col s3">
                      <h7>Email</h7>
                    </div>
                    <div className="col s3 push-s3">
                      <h7>
                        <b>{this.state.profile["account"]["email"]}</b>
                      </h7>
                    </div>
                  </div>
                  <div className="card-content">
                    <div className="col s3">
                      <h7>Full Name</h7>
                    </div>
                    <div className="col s3 push-s3">
                      <h7>
                        <b>
                          {this.state.profile["account"]["firstName"]}{" "}
                          {this.state.profile["account"]["lastName"]}
                        </b>
                      </h7>
                    </div>
                  </div>
                  <div className="card-content">
                    <div className="col s3">
                      <h7>Address</h7>
                    </div>
                    <div className="col s3 push-s3">
                      <h7>
                        <b>{this.state.profile["account"]["address"]}</b>
                      </h7>
                    </div>
                  </div>
                  <div className="card-content">

                    <button className="btn btn-profile blue darken-4"     type="submit" onClick={this.setEditTrue} >
                    Edit Profile
                  </button>


                  

                  </div>
                  <div className="card-content"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    }
  
}
