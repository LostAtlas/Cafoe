import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import UserDisplay from "../UserDisplay";
import GameSettings from "../GameSettings";

class GameCreation extends Component {
  render() {
    return (
      <div className="Content">
        <div id="contentNav">
            <UserDisplay />
            <NavLink exact to="/dashboard">
                <p>Public Games</p>
            </NavLink>
        </div>
        <GameSettings />

      </div>
    );
  }
}
export default GameCreation;