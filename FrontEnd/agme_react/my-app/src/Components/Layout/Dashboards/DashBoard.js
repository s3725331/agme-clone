import React, { Component } from "react";
import { Link, Router } from "react-router-dom";
import { useSelector, connect } from "react-redux";
import { getByText } from "@testing-library/react";
import Navbar from "../Navbars/MainNavbar/MainNavbar";
import MainSideNavbar from "../Navbars/SideNavbar/SideNavbar";
import Footer from "../Footer/Footer";
import LoggedInDashboard from "./LoggedInDashboard";
import LoggedOutDashboard from "./LoggedOutDashboard";

export default class DashBoard extends Component {

  componentDidMount() {
    const M = window.M;
    const sideNav = document.querySelector(".sidenav");
    M.Sidenav.init(sideNav, {});
  }
  
  render() {

    var DashboardCard;
    if (localStorage.getItem("currentUser") != null) {
      DashboardCard = <LoggedInDashboard />;
    } else {
      DashboardCard = <LoggedOutDashboard />;
    }

    return (
      <div>
        <a data-test="navbar"><Navbar /></a>
        <MainSideNavbar />
        {DashboardCard}
        <Footer />
      </div>
    );
  }
}
