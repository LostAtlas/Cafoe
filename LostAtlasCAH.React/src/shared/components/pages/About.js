import React, { Component } from "react";
import { NavLink } from "react-router-dom";


class About extends Component {
  render() {

    return (
      <div className="Content">
        <h1>About</h1>

        <NavLink exact to="/newgame">
                <p>CREATE GAME</p>
        </NavLink>
        <NavLink exact to="/gameroom">
                <p>GAMEROOM</p>
        </NavLink>
      </div>
    );
  }
}
export default About;