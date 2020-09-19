import React, { Component } from "react";
import SideNavbarLoggedIn from "./SideNavbarLoggedIn";
import SideNavbarLoggedOut from "./SideNavbarLoggedOut";
import { Link, Router } from "react-router-dom";

export default class SideNavbar extends Component {
  render() {
    var sideNavAccountComponent;
    if (localStorage.getItem("currentUser") != null) {
      sideNavAccountComponent = <SideNavbarLoggedIn />;
    } else {
      sideNavAccountComponent = <SideNavbarLoggedOut />;
    }

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
        <li>{sideNavAccountComponent}</li>
      </ul>
    );
  }
}
