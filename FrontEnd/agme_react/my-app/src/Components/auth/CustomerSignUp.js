import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createCustomer } from "../../actions/custCreateActions";

export class CustomerSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      type:""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const newAccount = {
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address
    }


    console.log(newAccount);
    this.props.createCustomer(newAccount, this.state.type, this.props.history);
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col s12 m4 offset-m4">
            <div className="card" data-test="card">
              <div className="card-action blue darken-4 white-text">
                <Link to="/Dashboard">
                  <span className="white-text text-darken-2 center-align" data-test="header">
                    <h2>Agme Booking</h2>
                  </span>
                </Link>
              </div>
              <form onSubmit={this.handleSubmit}>
              <div className="card-content">
                <h6> What's your email?</h6>
                <div data-test="email-field">
                  <input
                    placeholder="Enter your email."
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
                <h6> Confirm your email</h6>
                <div data-test="confirm-email-field">
                  <input
                    placeholder="Enter your email again."
                    type="email"
                    className="validate"
                  ></input>
                  <span
                    className="helper-text"
                    data-error="This email is invalid. Please make sure it's formatted like example@email.com"
                    data-success=""
                  ></span>
                </div>
              </div>
              <div className="card-content">
                <h6> Create a password</h6>
                <div data-test="password-field">
                  <input
                    placeholder="Create a password."
                    type="password"
                    className="validate"
                    name="password"
                    value= {this.state.password}
                    onChange={this.handleChange}
                  ></input>
                </div>
              </div>
              <div className="card-content">
                <h6> Confirm your password</h6>
                <div data-test="confirm-password-field">
                  <input
                    placeholder="Enter your password again."
                    type="password"
                    className="validate"
                  ></input>
                </div>
              </div>


              <div className="card-content">
                <h6> What's your First Name?</h6>
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
                <h6> What's your Last Name?</h6>
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
                <h6> What's your address?</h6>
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
              <h6> Are you a customer or a Worker? </h6>
              <select className = "browser-default" onChange={this.handleChange} 
              value= {this.state.type} 
              name = "type" required >
                      <option value="" disabled selected>Select account type</option>
                      <option value="Customer">Customer</option>
                      <option value="Worker">Worker</option>
                  </select>
                  
              </div>


              <div className="center-align">
                <button className="btn btn-form blue darken-4" 
                data-test="sign-up-button"
                type="submit">
                  Sign Up
                </button>
              </div>

              <div className="card-content center-align">
                <h6> Have an account?</h6>
                <Link to="/CustomerLogIn">
                  <h6>
                    <u> Log In.</u>
                  </h6>
                </Link>
                <div className="form-field"></div>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CustomerSignUp.propTypes = {
  createCustomer: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};


export default connect (
  null,
  {createCustomer}
)(CustomerSignUp);