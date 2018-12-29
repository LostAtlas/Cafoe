import React, { Component } from "react";
import { NavLink } from "react-router-dom";

//const signalR = require("@aspnet/signalr");

class UserLogin extends Component {

  render() {
    /*
    let connection = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:5000/chatHub")
        .build();
    
    connection.on("incomingMessage", data => {
        console.log(data);
    });
    
    connection.start()
        .then(() => connection.invoke("sendMessage", "Hello"));
   */
    return (
      <div id="enterPage">
        <div className="CenterBox">
                   <img src={require("../../images/logo1.png")} alt="Logo" />
                   <h3>CARDS AGAINST HUMANITY ONLINE</h3>
                   
                   <div>
                        <input type="text" name="username" placeholder="Username" />
                        <p>#0000</p>
                   </div>
                   <NavLink exact to="/dashboard">
                        <p id="submit">ENTER</p>
                   </NavLink>
                   
        </div>
      </div>
    );
  }
}
export default UserLogin;