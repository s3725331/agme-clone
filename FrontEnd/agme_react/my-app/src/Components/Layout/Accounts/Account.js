import React, { Component } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbars/MainNavbar/MainNavbar";
import axios from "axios";

export default class Account extends Component {
  constructor(props) {
    super(props);
    var user;
    var accountType;

    //checks what kind of user is logged in and saves the user into the user variable
    //while also setting accountType appropriately

    if (localStorage.getItem("customerObject") != null) {
      user = JSON.parse(localStorage.getItem("customerObject"));
      accountType = "Customer";
    } else if (localStorage.getItem("workerObject") != null) {
      user = JSON.parse(localStorage.getItem("workerObject"));
      accountType = "Worker";
    }

    //set state with current user

    this.state = {
      profile: user,
      book: null,
      account: accountType,
      loaded: false,
    };
  }

  async componentDidMount() {
    try {
      //if account type is of customer, gets all upcoming bookings with relevant customer id
      //and stores the state else if account type is of worker, gets all
      //upcoming bookings with relevant worker id and then sets loaded
      //state to true, which then renders the full page.

      //if a booking object is not returned, book state stays null and loaded is set to true and page renders

      if (this.state.account === "Customer") {
        const res = await axios.get(
          "http://localhost:8080/api/bookings/upcoming",
          { params: { customerId: this.state.profile["id"] } }
        );

        this.setState({ book: res.data, loaded: true });
      } else if (this.state.account === "Worker") {
        const res = await axios.get(
          "http://localhost:8080/api/bookings/upcoming",
          { params: { workerId: this.state.profile["id"] } }
        );

        this.setState({ book: res.data, loaded: true });
      }
    } catch (err) {
      if (err.response.status === 404) {
        this.setState({ loaded: true });
      }
    }
  }

  render() {
    //used to load page only when relevant information has been gathered
    if (!this.state.loaded) {
      return null;
    }

    return (
      <div>
        <Navbar />
        <div className="row">
          <div className="account-card">
            <div className="col s6 push-s3">
              <div className="card" data-test="card">
                <div className="card-action blue darken-4 white-text center-align">
                  <h4>
                    <b>Account Overview</b>
                  </h4>
                </div>
                <div class="row">
                  <div className="card-content">
                    <div className="col s3">
                      <h6>
                        <b>Profile</b>
                      </h6>
                    </div>
                  </div>
                  <div className="card-content">
                    <div className="col s3">
                      <h7>Email</h7>
                    </div>
                    <div className="col s3 push-s3">
                      <h7>
                        <b>{this.state.profile["account"]["email"]}</b>
                      </h7>
                    </div>
                  </div>
                  <div className="card-content">
                    <div className="col s3">
                      <h7>Full Name</h7>
                    </div>
                    <div className="col s3 push-s3">
                      <h7>
                        <b>
                          {this.state.profile["account"]["firstName"]}{" "}
                          {this.state.profile["account"]["lastName"]}
                        </b>
                      </h7>
                    </div>
                  </div>
                  <div className="card-content">
                    <div className="col s3">
                      <h7>Address</h7>
                    </div>
                    <div className="col s3 push-s3">
                      <h7>
                        <b>{this.state.profile["account"]["address"]}</b>
                      </h7>
                    </div>
                  </div>
                  <div className="card-content">
                    <button className="btn btn-profile blue darken-4" type="submit">
                      Edit Profile
                    </button>
                  </div>
                  <div className="card-content"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
