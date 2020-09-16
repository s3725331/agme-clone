import React, { Component } from "react";
import { Link, Router } from "react-router-dom";
import allReducer from './../../reducers/loggedIn';

export default class DashBoard extends Component {
  
  componentDidMount() {
    const M = window.M;
    const sideNav = document.querySelector(".sidenav");
    M.Sidenav.init(sideNav, {});
  }
  
  render() {

    return (
      <div>
        <div data-test="navbar">
          <nav className="blue darken-4">
            <div className="container">
              <div className="nav-wrapper">
                <a href="" className="brand-logo">
                  Agme Booking
                  <i className="material-icons">collections_bookmark</i>
                </a>
                <a href="" data-target="mobile-nav" className="sidenav-trigger">
                  <i className="material-icons">menu</i>
                </a>
                <ul className="right hide-on-med-and-down">
                
                  <li class="waves-effect col s3">
                    <a href="#home">Home</a>
                  </li>
                  <li class="waves-effect col s3">
                    <a href="#about">About</a>
                  </li>
                  <li class="waves-effect col s3">
                    <a href="#contact">Contact Us</a>
                  </li>
                  <li>
                    <a>|</a>
                  </li>
                  
                  {/*
                  <li>
                    <Link to="/CustomerSignUp">
                      <a>Sign Up</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/CustomerLogIn">
                      <a>Log In</a>
                    </Link>
                  </li>
                  */}
                  
                  <li class="waves-effect col s3">
                  <div>
                    <a class="area">
                      <i class="material-icons">account_circle</i>
                      <span class="nav-text">Profile 
                        <i class="material-icons right">arrow_drop_down</i>
                      </span>
                    </a>
                    </div>
                  </li>
                  
                </ul>
              </div>
            </div>
          </nav>
        </div>

        <ul className="sidenav" id="mobile-nav">
        
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#contact">Contact Us</a>
          </li>
          <li>
            <Link to="/CustomerSignUp">
              <a>Sign Up</a>
            </Link>
          </li>
          <li>
            <Link to="/CustomerLogIn">
              <a>Log In</a>
            </Link>
          </li>
          
        </ul>
        

        <ul className="mainDashboard">
          
        </ul>
      </div>
    );
  }
}

