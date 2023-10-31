import React, { Component } from "react";
import "./styles.css";
import Main from "./home_page/Main";
import Areas from "./home_page/Areas";
import Signin from './user/Signin';
import Signup from './user/Signup';
// import PrivateRoute from './auth/PrivateRoute';
import Home from './core/Home';

//include this import if the component uses routes & links
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <Route path='/main' exact component={Main} />
        <Route path='/areas' exact component={Areas} />
        <Route path='/' exact component={Home} />
        <Route path='/signin' component={Signin} exact />
        <Route path='/signup' component={Signup} exact />
      </Router>
    );
  }
}

export default App;