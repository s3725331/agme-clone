import React, { Component, useState } from "react";

export default class loggedInComponent extends Component {

  render() {

    return (
      <li class="waves-effect col s3">
        <div>
          <a class="dropdown-trigger">
            <i class="material-icons">account_circle</i>
            <span class="nav-text">
              Profile
              <i class="material-icons right">arrow_drop_down</i>
            </span>
          </a>
        </div>
      </li>
    );
  }
}
