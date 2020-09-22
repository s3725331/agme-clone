import React from 'react'
import './App.css'
import DashBoard from './Components/Layout/Dashboards/DashBoard'
import CustomerSignUp from './Components/auth/CustomerSignUp'
import CustomerLogIn from './Components/auth/CustomerLogIn'
import Booking from './Components/Layout/Booking'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              <Redirect to="/Dashboard" />
            </Route>
            <Route exact path="/Dashboard" component={DashBoard} />
            <Route exact path="/CustomerSignUp" component={CustomerSignUp} />
            <Route exact path="/CustomerLogIn" component={CustomerLogIn} />
            <Route exact path="/Booking" component={Booking} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
