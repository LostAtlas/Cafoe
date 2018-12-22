import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Navigation extends Component {
  render() {
    return (
      <div id="nav">
        <h1>LostAtlas React App</h1>
        <div id="menu">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>
        
      </div>
    );
  }
}
export default Navigation;