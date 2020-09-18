import React, { Component } from "react";
import NavbarLoggedIn from "./NavbarLoggedIn";
import NavbarLoggedOut from "./NavbarLoggedOut"

export default class Navbar extends Component {
  render() {
    var accountComponent;
    if (localStorage.getItem("currentUser") != null) {
      accountComponent = <NavbarLoggedIn />;
    } else {
      accountComponent = <NavbarLoggedOut />;
    }

    return (
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
                  <a>|</a>
                </li>
                <li>{accountComponent}</li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
