import React, { Component } from "react";

import Chat from "../Chat";
import GameView from "../GameView";

class GameRoom extends Component {
  render() {
    return (
      <div className="Content"> 
        <Chat />
        <GameView />
      </div>
    );
  }
}
export default GameRoom;