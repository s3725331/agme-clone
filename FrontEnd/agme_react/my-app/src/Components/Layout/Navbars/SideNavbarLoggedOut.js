import React, { Component } from "react";
import NavbarLoggedIn from "./NavbarLoggedIn";
import NavbarLoggedOut from "./NavbarLoggedOut";
import { Link, Router } from "react-router-dom";

export default class SideNavbar extends Component {
  render() {
    return (
      <ul id="mobile-nav">
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
