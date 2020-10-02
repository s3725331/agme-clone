import React, { Component } from "react";
import Navbar from "./../Layout/Navbars/MainNavbar/MainNavbar";
import axios from "axios";

export default class WorkerConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workers: null,
      worker: null,
      loaded: false,
      email:"",
      worker2: null
      
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state.worker);
    if(e.target.name === "worker") {
        this.setState({worker2: this.state.workers[this.state.worker]})
    }
}

  async componentDidMount() {
    //used to load information on all workers in database in order to give options to the customer
    //when choosing which worker they want to book

    //set loaded state to true if all workers have bee loaded or if no workers have been found
    //in order to render page

    try {
      const res = await axios.get(
        "http://localhost:8080/api/worker/all/authenticate"
      );
      this.setState({ workers: res.data, loaded: true });
      console.log(res.data);
    } catch (err) {
      if (err.response.status === 404) {
        this.setState({ loaded: true });
      }
    }
  }
  render() {
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
                    <b>Worker confirmation</b>
                  </h4>
                </div>
                <div class="row">
                  <div className="card-content" data-test="workers">
                    <h6>
                      <b> Pending worker accounts</b>
                    </h6>
                    <div className="form-field">
                      {/* if workers exist, loop through each worker in the drop down menu for the form
                  if they dont exit, load message saying workers dont exist*/}
                      {this.state.workers === null ? (
                        <h7> No workers currently pending approval </h7>
                      ) : (
                        <select
                          className="browser-default"
                          name="worker"
                          value={this.state.worker}
                          //email={this.state.email}
                          onChange={this.handleChange}
                          required
                        >
                          <option value="" disabled selected>
                            Choose your option
                          </option>
                          {this.state.workers.map((workerTest, index) => (
                            <option value={index} key={workerTest["id"]}>
                              {" "}
                              {workerTest["account"]["firstName"]}{" "}
                              {workerTest["account"]["lastName"]}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                    <div className="card-content">
                    {this.state.worker2 === null ? null : 
                    <h6>{this.state.worker2["account"]["firstName"]}</h6>}
                    </div>
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
