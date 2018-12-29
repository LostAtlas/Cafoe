import React, { Component } from "react";

class Option extends Component {

  render() {
    var selection = "";
    if(this.props.data.selectType == "num"){
        selection +=  "<select>"
        for(var x = 1; x <= this.props.data.selectSize;x++){
            selection += "<option value=" + x + ">" + x + "</option>";
        }
        selection +=  "</select>"
    }else if(this.props.data.selectType == "privacy"){
        selection = "<select><option value=\"public\">Public</option><option value=\"private\">Private</option></select>"
    }else if(this.props.data.selectType == "password"){
        selection = "<input type=\"password\" name=\"gamePassword\"  />"
    }
    

    return (
      <div className="SettingOptions"> 
        <h2>{this.props.data.title}:</h2>
        <div className="Container" dangerouslySetInnerHTML={{__html: 
        selection}}></div>
 
      </div>
    );
  }
}
export default Option;