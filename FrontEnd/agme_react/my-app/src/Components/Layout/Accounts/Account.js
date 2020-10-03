import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Navbar from "../Navbars/MainNavbar/MainNavbar";
import { updateAccount } from "../../../actions/updateActions";
import axios from "axios";

 class Account extends Component {
  constructor(props) {
    super(props);
    var user;
    var accountType;
    var serviceValue;

    //checks what kind of user is logged in and saves the user into the user variable
    //while also setting accountType appropriately

    if (localStorage.getItem("customerObject") !== null) {
      user = JSON.parse(localStorage.getItem("customerObject"));
      accountType = "Customer";
    } else if (localStorage.getItem("workerObject") !== null) {
      user = JSON.parse(localStorage.getItem("workerObject"));
      accountType = "Worker";
      serviceValue = user["serviceName"]["service"];
    }else if (localStorage.getItem("adminObject") !== null) {
      user = JSON.parse(localStorage.getItem("adminObject"));
      accountType = "Admin";
    }

    //set state with current user

    this.state = {
      profile: user,
      type: accountType,
      loaded: false,
      editStatus: false,
      service:serviceValue,
      services: null,
      email: user["account"]["email"],
      firstName: user["account"]["firstName"],
      lastName: user["account"]["lastName"],
      address: user["account"]["address"]
    };

 
    this.setEditTrue = this.setEditTrue.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    var account;
    if (localStorage.getItem("customerObject") !== null) {
      account = JSON.parse(localStorage.getItem("customerObject"));
    } else if (localStorage.getItem("workerObject") !== null) {
      account = JSON.parse(localStorage.getItem("workerObject"));
      account["serviceName"]["service"] = this.state.service;
    } else if (localStorage.getItem("adminObject") !== null) {
      account = JSON.parse(localStorage.getItem("currentUser"));
    }

    if(this.state.type!="Admin") {

    account["account"]["email"]=this.state.email;
    account["account"]["firstName"]=this.state.firstName;
    account["account"]["lastName"]=this.state.lastName;
    account["account"]["address"]=this.state.address;
  }
    else {
      account["email"]=this.state.email;
      account["firstName"]=this.state.firstName;
      account["lastName"]=this.state.lastName;
      account["address"]=this.state.address;

    }

    console.log(account)

    this.props.updateAccount(account, this.state.type, this.props.history);
   // console.log(account)
  
    this.setState({ editStatus: false });
   
  }


  setEditTrue(){
    this.setState({ editStatus: true });
  }

  async componentDidMount() {



    try{
    const res = await axios.get("http://localhost:8080/api/service/all");
    this.setState({ services: res.data, loaded: true });
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
    return (
      <div className = "center-align">
              <div className="progress">
              <div className="indeterminate"></div>
          </div>
          </div>
      
            );
}

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
                          <b>Edit Profile</b>
                        </h6>
                      </div>
                    </div>

                    <form onSubmit={this.handleSubmit}>
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
                  {(this.state.type !== "Worker") ? null: 
                  <h7>Edit Service</h7>
                }
                {
                
                
                
                  (this.state.type !== "Worker") ? null: 
                
                <select className = "browser-default" onChange={this.handleChange} 
                value= {this.state.service} 
                name = "service">
                <option value = "" disabled selected>Choose your option</option>
                {
                  
                  this.state.services.map((service, index) => (
                    <option key={index} value={service['service']}> {service['service']} </option>
                  ))
                }
                    </select> 
  
     
                  
                }
                </div>
    
    
                  <div className="card-content">
  
                  
  
                  <button className="btn btn-profile blue darken-4"    type="submit" >
                  Save Profile
                  
                </button> 



                </div>

                </form>


                    </div>
                    
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
                  <div className="col s3">
                  {(this.state.type !== "Worker") ? null: 
                  <h7>Service</h7>
                }
                    
                  </div>
                  <div className="col s3 push-s3">
                    <h7>

                    {(this.state.type !== "Worker") ? null: 
                    <b>{this.state.profile["serviceName"]["service"]}</b>
                  }
                      
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
Account.propTypes = {
  updateAccount: PropTypes.func.isRequired,
};


export default connect (
  null,
  {updateAccount}
)(Account);