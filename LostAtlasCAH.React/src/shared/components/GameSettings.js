import React, { Component } from "react";
import Option from "./Option";
import { NavLink } from "react-router-dom";

class GameSettings extends Component {
  render() {
    //var cardPackList = [];
    var settingOptionsArray = [{ title: "Score limit",
                                  selectType: "num",
                                  selectSize: "20"},

                                { title: "Player limit",
                                  selectType: "num",
                                  selectSize: "10"},

                                { title: "Timer limit",
                                  selectType: "num",
                                  selectSize: "15"},

                                { title: "Spectator limit",
                                  selectType: "num",
                                  selectSize: "10"},

                                { title: "Privacy",
                                  selectType: "privacy"},

                                { title: "Game password",
                                  selectType: "password"}];
                             
    
    const optionsList = settingOptionsArray.map((obj, i) => 
      <Option key={i} data={obj}/>
   );
    /*
    for(var i = 0; i < 12; i++){
      cardPackList.push(<div key ={i} className="CardPack"></div>);
    }
    */
    var cardPackString = "";
    var num = 0;
    var count = 0;
    for(var c = 0; c < 9; c++){
      num = count / 8;
      cardPackString += "<div>";
      if(num < 8){
        for(var v = 0; v < 8; v++){
          cardPackString += "<div key ={" + count + "} class=\"CardPack\"></div>";
          count++;
        }
      }else{
        /*
        for(var v = 0; v < 5; v++){
          cardPackString += "<div key ={" + count + "} class=\"CardPack\"></div>";
          count++;
        }
        */
      }
      cardPackString += "</div>";
    }

    return (
      <div id="settings">
        <div id="set1">
            <h1>GAME CREATION</h1>
            {optionsList}
        </div>
        <div id="set2">
          <h2>Card Sets</h2>
          <div className="Container" dangerouslySetInnerHTML={{__html: 
          cardPackString}}></div>
        </div>
        <NavLink exact to="/dashboard">
             <p id="startNewGame">CREATE LOBBY</p>
        </NavLink>
      </div>
    );
  }
}
export default GameSettings;