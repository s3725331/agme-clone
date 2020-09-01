import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class CustomerLogIn extends Component {
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
              <div class="card-content">
                <div class="form-field">
                  <input
                    placeholder="Email address or username."
                    class="validate"
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
                    placeholder="Please enter your password."
                    class="validate"
                  ></input>
                  <span
                    class="helper-text"
                    data-error="Please enter your password."
                    data-success=""
                  ></span>
                </div>
              </div>
              <div class="center-align">
                <a class="btn btn-block blue darken-4" type="submit">
                  Log In
                </a>
              </div>
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
