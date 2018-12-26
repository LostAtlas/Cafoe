import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <div id="content">
        <div id="centerBox">
                   <img src={require("../../images/logo1.png")} alt="Logo" />
                   <h3>CARDS AGAINST HUMANITY ONLINE</h3>
                   
                   <div>
                        <input type="text" name="username" placeholder="Username" />
                        <p>#0000</p>
                   </div>
                   <p id="submit">PLAY</p>
        </div>
      </div>
    );
  }
}
export default Home;