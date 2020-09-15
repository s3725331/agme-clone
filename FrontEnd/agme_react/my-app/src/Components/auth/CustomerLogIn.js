import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

export default class CustomerLogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
  }

  render() {

    return (
      <div>
        <div className="row">
          <div className="col s12 m4 offset-m4">
            <div className="card">
              <div class="card-action blue darken-4 white-text">
                <Link to="/Dashboard">
                  <span class="white-text text-darken-2 center-align">
                    <h2>Agme Booking</h2>
                  </span>
                </Link>
              </div>
              <form onSubmit={this.handleSubmit}>
                <div class="card-content">
                  <div class="form-field">
                    <input
                    field="identifier"
                    placeholder="Please enter your email."
                    name="email"
                    value= {this.state.email}
                    onChange={this.handleChange}
                    ></input>
                    <span
                      class="helper-text"
                      data-error="Please enter your email address or username."
                      data-success=""
                    ></span>
                  </div>
                </div>
                <div class="card-content">
                  <div class="form-field">
                    <input
                      field="password"
                      placeholder="Please enter your password."
                      name="password"
                      value= {this.state.password}
                      onChange={this.handleChange}
                      type="password"
                    ></input>
                    <span
                      class="helper-text"
                      data-error="Please enter your password."
                      data-success=""
                    ></span>
                  </div>
                </div>
                <div class="center-align">
                  <button
                    className="btn btn-block blue darken-4"
                    type="submit"
                  >
                    Log In
                  </button>
                </div>
              </form>
              <div class="card-content center-align">
                <h8>
                  <b>Don't have an account?</b>
                </h8>
                <div class="form-field"></div>
              </div>
              <div class="card-content">
                <div class="center-align">
                  <a
                    class="btn btn-block blue-grey lighten-5 blue-text"
                    type="submit"
                  >
                    <Link to="/CustomerSignUp">Sign Up for Agme</Link>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
