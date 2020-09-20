import React, { Component } from "react";

import { Link, Router } from "react-router-dom";

export default class Footer extends Component {
  render() {
    return (
      <footer class="page-footer blue darken-4" data-test="footer">
        <div class="container">
          <div class="row">
            <div class="col l6 s12">
              <a class="white-text" href="">
                <h6>
                  <i className="material-icons">collections_bookmark</i>Agme
                  Booking
                </h6>
              </a>
              <p class="white-text text-lighten-4"><a class="white-text" href="#!">About</a></p>
            </div>
            <div class="col l4 offset-l2 s12" data-test="social-links">
              <h6 class="white-text">Social links</h6>
              <ul>
                <li>
                  <a class="grey-text text-lighten-3" href="#!" data-test="facebook-link">
                    Facebook
                  </a>
                </li>
                <li>
                  <a class="grey-text text-lighten-3" href="#!" data-test="twitter-link">
                    Twitter
                  </a>
                </li>
                <li>
                  <a class="grey-text text-lighten-3" href="#!"data-test="linkedIn-link">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a class="grey-text text-lighten-3" href="#!" data-test="instagram-link">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="footer-copyright">
          <div class="container">
            © 2020 Agme Booking
            <a class="grey-text text-lighten-4 right">Australia</a>
          </div>
        </div>
      </footer>
    );
  }
}
