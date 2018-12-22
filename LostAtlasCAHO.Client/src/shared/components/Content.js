import React, { Component } from "react";
import {Route, Switch} from "react-router-dom";

import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import Contact from './pages/Contact';


class Content extends Component {
  render() {
    return (
        <div>
          <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/about" component={About} />
              <Route path="/profile" component={Profile} />
              <Route path="/contact" component={Contact} />
          </Switch>
        </div>
    );
  }
}
export default Content;