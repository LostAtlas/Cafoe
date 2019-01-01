import React, { Component } from "react";
import { NavLink } from "react-router-dom";

const signalR = require("@aspnet/signalr");

var signalrConnection = false;

class About extends Component {
  render() {

    var gameId= "123";
    var userId = "963";
    var SessionIds  = [gameId, userId];

    let connection = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:5000/chatHub")
        .build();
    
    
    if(!signalrConnection){
        connection.start()
        .then(() => connection.invoke("joinGameSession", SessionIds))
        .then(() => connection.invoke("sendMessage", "Hello"));

        signalrConnection = true;
    }

    connection.on("incomingMessage", data => {
        console.log(data);
    });
    

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