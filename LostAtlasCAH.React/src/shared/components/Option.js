import React, { Component } from "react";

class Option extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      select: 'select',
      pass: ''
    }
  }

  updateSelectChange(event){
    this.setState({
      select: event.target.value
    })
  }

  updatePasswordChange(event){
    this.setState({
      pass: event.target.value
    })
  }
  
  render() {

    var selection = [];
    if(this.props.data.selectType == "num"){
        
       for(var x = 1; x <= this.props.data.selectSize;x++){
           selection.push(<option key={x} value={x}>{x}</option>);
       }
  
    }else if(this.props.data.selectType == "privacy"){
        selection = [<option key="1" value="public">Public</option>, <option key="2" value="private">Private</option>];
    }
    
    return (
      <div className="SettingOptions"> 
        <h2>{this.props.data.title}:</h2>
        { this.props.data.selectType == "password" ? (
          <input onChange={this.updatePasswordChange.bind(this)} type="password" name="gamePassword" id= {this.props.data.selectId} />
        ):(
          <select onChange={this.updateSelectChange.bind(this)} value={this.state.select}>
            {selection}
          </select>
        )}
      </div>
    );
  }
}
export default Option;
