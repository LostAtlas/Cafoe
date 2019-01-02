import React, { Component } from "react";
import Chat from "../Chat";
import GameView from "../GameView";
const signalR = require("@aspnet/signalr");


class GameRoom extends Component {
  constructor(props){
    super(props);
    this.state = {
      signalrConnection: false,
      connection: null
    }
  }

  componentDidMount(){

    var gameId= "123";
    var userId = "963";
    var SessionIds  = [gameId, userId];

    let connection = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:5000/chatHub")
        .build();

    console.log(connection);
    this.setState({connection}, ()=>{

      if(!this.state.signalrConnection){
      
        this.state.connection.start()
        .then(() => connection.invoke("joinGameSession", SessionIds))
        .then(() => connection.invoke("sendMessage", "Hello"))
        .catch(err => console.log("Connection Failed..."));
        
        this.setState({
          signalrConnection: true
        })
      }
  
      this.state.connection.on("incomingMessage", data => {
          console.log(data);
      });

      this.state.connection.on("receiveMessage", data => {
        this.chat.receiveMessage(data);
      });

    });

  }

  render() {
    return (
      <div className="Content"> 
        <Chat ref={(hold)=> {this.chat = hold}} isConnected={{bool: this.state.signalrConnection, connectionHub: this.state.connection}}/>
        <GameView />
      </div>
    );
  }
}
export default GameRoom;