import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class loggedOutComponent extends Component {
  render() {
    return (
      <div data-test="logged-out-account-component">
        <li>
          <Link to="/CustomerSignUp">Sign Up</Link>
        </li>
        <li>
          <Link to="/CustomerLogIn">Log In</Link>
        </li>
      </div>
    );
  }
}
