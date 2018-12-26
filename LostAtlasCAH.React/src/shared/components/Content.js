import React, { Component } from "react";
import {Route, Switch} from "react-router-dom";

import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import Contact from './pages/Contact';


class Content extends Component {
  render() {
    return (
        <div id="content">
          <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/game" component={About} />
              <Route path="/search" component={Profile} />
              <Route path="/logout" component={Contact} />
          </Switch>
        </div>
    );
  }
}
export default Content;