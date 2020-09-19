import React, { Component } from "react";
import { Link, Router } from "react-router-dom";
import { useSelector, connect } from "react-redux";
import { getByText } from "@testing-library/react";
import Navbar from "./Navbars/MainNavbar";
import MainSideNavbar from "./Navbars/MainSideNavbar";
import Footer from "./Footer";

export default class DashBoard extends Component {

  componentDidMount() {
    const M = window.M;
    const sideNav = document.querySelector(".sidenav");
    M.Sidenav.init(sideNav, {});
  }
  
  render() {
    return (
      <div>
        <Navbar />
        <MainSideNavbar />
        <Footer />
      </div>
    );
  }
}