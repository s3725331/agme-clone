import React from 'react';
import './App.css';
import Navbar, { DashBoard } from './Components/Layout/DashBoard';
import CustomerSignUp from './Components/Layout/CustomerSignUp';
import CustomerLogIn from './Components/Layout/CustomerLogIn';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/Dashboard" component={DashBoard}/>
          <Route path="/CustomerSignUp" component={CustomerSignUp}/>
          <Route path="/CustomerLogIn" component={CustomerLogIn}/>
        </Switch>
        </div>
    </Router>
  );
}

export default App;
