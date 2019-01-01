import React, { Component } from "react";

class Message extends Component {
  render() {
    return (
      <div className="message">
        <img src={`${this.props.data.img}`} alt="Profile Pic" className="msgProfPic"/>
        <p className="msgUsername">{this.props.data.username}</p>
        <p className="msgTime">{this.props.data.time}</p>
        <p className="msgPost">{this.props.data.post}</p>
      </div>
    );
  }
}
export default Message;
