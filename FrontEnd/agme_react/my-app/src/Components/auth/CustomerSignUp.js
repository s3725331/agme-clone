import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class CustomerSignUp extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const M = window.M;
    const Calender = document.querySelector(".datepicker");
    M.Datepicker.init(Calender, {
      defaultDate: new Date(),
      format: this.calenderState.format,
      container: "body",
    });
  }

  calenderState = {
    value: new Date(),
    format: "dd mmm, yyyy",
    formatMoment: "dd MMM, YYYY",
  };

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
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
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col s12 m4 offset-m4">
            <div className="card">
              <div className="card-action blue darken-4 white-text">
                <Link to="/Dashboard">
                  <span className="white-text text-darken-2 center-align">
                    <h2>Agme Booking</h2>
                  </span>
                </Link>
              </div>
              <form onSubmit={this.handleSubmit}>
              <div className="card-content">
                <h6> What's your email?</h6>
                <div className="form-field">
                  <input
                    placeholder="Enter your email."
                    id="email"
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
                <div className="form-field">
                  <input
                    placeholder="Enter your email again."
                    id="email"
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
                <div className="form-field">
                  <input
                    placeholder="Create a password."
                    id="password"
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
                <div className="form-field">
                  <input
                    placeholder="Enter your password again."
                    id="password"
                    type="password"
                    className="validate"
                  ></input>
                </div>
              </div>


              <div className="card-content">
                <h6> What's your First Name?</h6>
                <div className="form-field">
                  <input
                    placeholder="Enter your First Name."
                    id="firstName"
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
                <div className="form-field">
                  <input
                    placeholder="Enter your last name."
                    id="lastName"
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
                <div className="form-field">
                  <input
                    placeholder="Enter Address."
                    id="address"
                    type="text"
                    className="validate"
                    name = "address"
                    value= {this.state.address}
                    onChange={this.handleChange}
                  ></input>
                </div>
              </div>




              <div className="card-content">
                <h6> What's your date of birth?</h6>
                <input
                  type="text"
                  id="dob"
                  className="datepicker"
                  placeholder="Choose your date of birth."
                  onChange={this.handleChange}
                ></input>
              </div>

              <div className="card-content">
                <h6> What's your gender?</h6>
                <p>
                  <br />
                  <label className="checkbox-left">
                    <input type="checkbox" />
                    <span>Male</span>
                  </label>
                  <label className="checkbox-middle">
                    <input type="checkbox" />
                    <span>Female</span>
                  </label>
                </p>
              </div>

              <div className="center-align">
                <button className="btn btn-block blue darken-4" type="submit">
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
