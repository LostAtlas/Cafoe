import React, { Component } from "react";
import Option from "./Option";

class GameSettings extends Component {
  render() {
    return (
      <div id="settings">
        <div id="set1">
            <h1>GAME CREATION</h1>
            <Option data={{ title: "Score limit",
                            selectType: "num",
                            selectSize: "20"}}/>
            <Option data={{ title: "Player limit",
                            selectType: "num",
                            selectSize: "10"}}/>
            <Option data={{ title: "Timer limit",
                            selectType: "num",
                            selectSize: "15"}}/>
            <Option data={{ title: "Spectator limit",
                            selectType: "num",
                            selectSize: "10"}}/>
            <Option data={{ title: "Privacy",
                            selectType: "privacy"}}/>
            <Option data={{ title: "Game password",
                            selectType: "password"}}/>
            </div>
        <div id="set2">
            <div className="CardPack"></div>
            <div className="CardPack"></div>
            <div className="CardPack"></div>
            <div className="CardPack"></div>
            <div className="CardPack"></div>
            <div className="CardPack"></div>
            <div className="CardPack"></div>
            <div className="CardPack"></div>
            <div className="CardPack"></div>
            <div className="CardPack"></div>
            <div className="CardPack"></div>
            <div className="CardPack"></div>
        </div>
        
      </div>
    );
  }
}
export default GameSettings;