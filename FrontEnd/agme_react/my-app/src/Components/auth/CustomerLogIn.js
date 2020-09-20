import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAccount } from "../../actions/getAccountActions";
import { loginUser } from "../../actions/logActions";

export class CustomerLogIn extends Component {
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


  //used for testing 
  test(){

   if(localStorage.getItem('currentUser')!= null){ 
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //console.log(currentUser['email']);
    console.log(currentUser);

   } else{
     console.log("null user");
   }
   


  }

  reset(){
        localStorage.clear();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.getAccount(this.state.email, this.state.password, this.props.history);
    console.log(this.state);
  }

  render() {

    return (
      
      <div>
        <div className="row">
          <div className="col s12 m4 offset-m4">
            <div className="card" data-test="card">
              <div class="card-action blue darken-4 white-text"
              onClick={this.reset}>
                <Link to="/Dashboard">
                  <span class="white-text text-darken-2 center-align">
                    <h2 data-test="header">Agme Booking</h2>
                  </span>
                </Link>
              </div>
              <form onSubmit={this.handleSubmit}>
                <div class="card-content">
                  <div data-test="email-field">
                    <input
                    field="identifier"
                    placeholder="Please enter your email."
                    name="email"
                    type="email"
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
                  <div data-test="password-field">
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
                    className="btn btn-form blue darken-4"
                    data-test="log-in-button"
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
                    data-test="signUpButton"
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

CustomerLogIn.propTypes = {
  getAccount: PropTypes.func.isRequired
};

export default connect (
  null,
  {getAccount}
)(CustomerLogIn);