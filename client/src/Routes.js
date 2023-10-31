import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';
import NotFound from './core/NotFound';
import Hello from './core/Hello';
import "./stylesheets/index.css";
const Routes = () => {
  return (
    <div className="container">
      <BrowserRouter>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/signin' component={Signin} exact />
        <Route path='/signup' component={Signup} exact />
        <Route path='/hello' component={Hello} exact />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
    </div>
  );
};

export default Routes;
