import React, { Component } from "react";
import SideNavbarLoggedIn from "./SideNavbarLoggedIn";
import SideNavbarLoggedOut from "./SideNavbarLoggedOut";
import { Link, Router } from "react-router-dom";

export class SideNavbar extends Component {

  render() {
    var sideNavAccountComponent;
    if (localStorage.getItem("currentUser") != null) {
      sideNavAccountComponent = <SideNavbarLoggedIn />;
    } else {
      sideNavAccountComponent = <SideNavbarLoggedOut />;
    }

    return (
      <ul className="sidenav" id="mobile-nav" data-test="side-nav">
        <li>
          <a href="#home" data-test="home">Home</a>
        </li>
        <li>
          <a href="#contact">Contact Us</a>
        </li>
        <li><i data-test="account-component">{sideNavAccountComponent}</i></li>
      </ul>
    );
  }
}

export default SideNavbar;
