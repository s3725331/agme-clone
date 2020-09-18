import React, { Component } from "react";
import NavbarLoggedIn from "./NavbarLoggedIn";
import NavbarLoggedOut from "./NavbarLoggedOut";
import { Link, Router } from "react-router-dom";

export default class SideNavbar extends Component {
  render() {
    return (
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
    );
  }
}
