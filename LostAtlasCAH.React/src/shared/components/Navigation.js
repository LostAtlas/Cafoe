import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Navigation extends Component {
  render() {
    return (
      <div id="nav">

        <div id="logo">
         <img src={require("../images/smallLogo.png")} alt="CAHO"/>
        </div>
        <div id="menu">
          <NavLink to="/dashboard">
            <img src={require("../images/homeIcon.png")} alt="Home"/>
          </NavLink>
          <NavLink to="/game">
            <img src={require("../images/cardsIcon2.png")} alt="Play"/>
          </NavLink>
          <NavLink to="/search">
            <img src={require("../images/searchIcon.png")} alt="Search"/>
          </NavLink>
        </div>
        <div id="log">
          <NavLink exact to="/">
          <img src={require("../images/logoutIcon.png")} alt="Logout"/>
          </NavLink>
        </div>

      </div>
    );
  }
}
export default Navigation;