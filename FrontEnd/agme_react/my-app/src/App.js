import React from 'react';
import './App.css';
import DashBoard from './Components/Layout/DashBoard';
import CustomerSignUp from './Components/auth/CustomerSignUp';
import CustomerLogIn from './Components/auth/CustomerLogIn';
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
