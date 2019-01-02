import React, { Component } from "react";
import Chat from "../Chat";
import GameView from "../GameView";
const signalR = require("@aspnet/signalr");

var isSignalrConnected = false;


class GameRoom extends Component {
  constructor(props){
    super(props);
    this.state = {
      isSignalrConnected: isSignalrConnected,
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

    this.setState({connection}, ()=>{

      if(!this.state.isSignalrConnected){
      
        this.state.connection.start()
        .then(() => connection.invoke("joinGameSession", SessionIds))
        .then(() => connection.invoke("sendMessage", "Hello"))
        .catch(err => console.log("Connection Failed..."));
        
        this.setState({
          isSignalrConnected: true
        })
        isSignalrConnected = true;
      }
  
      this.state.connection.on("incomingMessage", data => {
          console.log(data);
      });

      this.state.connection.on("receiveMessage", data => {
        this.chat.receiveMessage(data);
      });

    });

  }

  componentWillUnmount() {
    isSignalrConnected = false;
    this.state.connection.stop();
  }

  render() {
    return (
      <div className="Content"> 
        <Chat ref={(hold)=> {this.chat = hold}} isConnected={{bool: this.state.isSignalrConnected, connectionHub: this.state.connection}}/>
        <GameView />
      </div>
    );
  }
}
export default GameRoom;