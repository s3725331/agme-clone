import React, { Component } from "react";
import NavbarLoggedIn from "../MainNavbar/NavbarLoggedIn";
import NavbarLoggedOut from "../MainNavbar/NavbarLoggedOut";
import { Link, Router } from "react-router-dom";

export default class SideNavbar extends Component {
  render() {
    return (
      <ul id="mobile-nav">
        <li>
          <Link to="/CustomerSignUp">
            <h8>Sign Up</h8>
          </Link>
        </li>
        <li>
          <Link to="/CustomerLogIn">
            <h8>Log In</h8>
          </Link>
        </li>
      </ul>
    );
  }
}
