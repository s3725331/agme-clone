import React from 'react'
import './App.css'
import DashBoard from './Components/Layout/Dashboards/DashBoard'
import CustomerSignUp from './Components/auth/CustomerSignUp'
import CustomerLogIn from './Components/auth/CustomerLogIn'
import Booking from './Components/Layout/Booking'
import CurrentBooking from './Components/Layout/CurrentBooking'
import PastBooking from './Components/Layout/PastBooking'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import Account from './Components/Layout/Accounts/Account'
import WorkerConfirmation from './Components/auth/WorkerConfirmation'
import ViewCalendar from './Components/Layout/ViewCalendar'

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
            <Route exact path="/CurrentBooking" component = {CurrentBooking}/>
            <Route exact path="/PastBooking" component = {PastBooking}/>
            <Route exact path="/Account" component = {Account}/>
            <Route exact path="/WorkerConfirmation" component = {WorkerConfirmation}/>
            <Route exact path="/ViewCalendar" component = {ViewCalendar}/>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
