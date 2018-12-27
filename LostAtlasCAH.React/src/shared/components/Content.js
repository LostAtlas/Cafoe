import React, { Component } from "react";
import {Route, Switch} from "react-router-dom";

import About from './pages/About';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import UserLogin from "./pages/UserLogin";
import GameCreation from "./pages/GameCreation";

class Content extends Component {
  render() {
    return (
        <div>
          <Switch>
              <Route path="/" component={UserLogin} exact />
              <Route path="/Dashboard" component={About} />
              <Route path="/Game" component={About} />
              <Route path="/NewGame" component={GameCreation} />
              <Route path="/Search" component={Profile} />
              <Route path="/Logout" component={Contact} />
          </Switch>
        </div>
    );
  }
}
export default Content;