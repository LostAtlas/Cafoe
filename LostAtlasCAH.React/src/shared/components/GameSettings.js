import React, { Component } from "react";
import Option from "./Option";

var settingOptionsArray = [{ title: "Score limit",
                                  selectId: "scoreLimit",
                                  selectType: "num",
                                  selectSize: "20"},

                                { title: "Player limit",
                                  selectId: "playerLimit",
                                  selectType: "num",
                                  selectSize: "10"},

                                { title: "Timer limit",
                                  selectId: "timerLimit",
                                  selectType: "num",
                                  selectSize: "15"},

                                { title: "Spectator limit",
                                  selectType: "num",
                                  selectId: "spectatorLimit",
                                  selectSize: "10"},

                                { title: "Privacy",
                                  selectId: "privacy",
                                  selectType: "privacy"},

                                { title: "Game password",
                                  selectId: "gamePassword",
                                  selectType: "password"}];

class GameSettings extends Component {


  render() {

    var holder = [];
    var setRef = (ref) => {
      holder.push(ref);
    };

    var redirect = () => {

      holder[0].state.select

      var gameSettings = {
        score: holder[0].state.select,
        playerLimit: holder[1].state.select,
        timerLimit: holder[2].state.select,
        spectatorLimit: holder[3].state.select,
        privacy: holder[4].state.select,
        gamePassword: holder[5].state.pass
      }

      console.log(holder);
      console.log(gameSettings);
    }

    const optionsList = settingOptionsArray.map((obj, i) => 

      <Option ref={setRef} key={i} data={obj}/>
   );
    
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
        
        <p onClick={redirect} id="startNewGame" >CREATE LOBBY</p>
        
      </div>
    );
  }
}
export default GameSettings;
