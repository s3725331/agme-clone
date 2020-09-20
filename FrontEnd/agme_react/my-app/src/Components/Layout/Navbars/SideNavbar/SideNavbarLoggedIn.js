import React, { Component } from "react";
import NavbarLoggedIn from "../MainNavbar/NavbarLoggedIn";
import NavbarLoggedOut from "../MainNavbar/NavbarLoggedOut";
import { Link, Router } from "react-router-dom";

export default class SideNavbar extends Component {
  logOut() {
    localStorage.clear();
  }

  render() {
    return (
      <ul id="mobile-nav">
        <li>
          <a href="">Account</a>
        </li>
        <li>
          <a href="" onClick={this.logOut}>Log Out</a>
        </li>
      </ul>
    );
  }
}
