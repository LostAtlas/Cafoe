import React, { Component } from "react";


class Message extends Component {
  constructor(props){
    super(props)
    // binds formatDate method to the class 
    this.formatDate = this.formatDate.bind(this);  
    //Declares msgTime state vaiable that will be used to display formated time in user messages.
    this.state = {
      msgTime: "",
   }
  }

  // Native method of every Component Class that runs code after all parent class components are rendered.
  componentDidMount() {
    //runs formatDate method when class components are rendered.
    this.formatDate();
  }

  /* Method that formats message time. 
  **  */
  formatDate(){
    var date = "";
    var postDate = this.props.data.date;
    var currentDate = new Date();
    var weekday = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    
    var dayMonthYear = [];
    var monthYear = [];

    dayMonthYear.push(currentDate.getDate() + "/" + currentDate.getMonth() + "/" + currentDate.getFullYear());
    monthYear.push(currentDate.getMonth() + "/" + currentDate.getFullYear());

    dayMonthYear.push( postDate.day + "/" + postDate.month + "/" + postDate.year);
    monthYear.push(postDate.month + "/" + postDate.year);

    var hours = postDate.hour;
    var minutes = postDate.minutes;
    var ampm = (hours >= 12) ? 'PM' : 'AM'; 
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = ('0'+minutes).slice(-2);

    //default format
    date = postDate.month + "/" + postDate.day + "/" + postDate.year;

    if(dayMonthYear[0] == dayMonthYear[1]){

      date = "Today at " + hours + ":" + minutes + " " + ampm;

    }
    else if(monthYear[0] == monthYear[1] && (currentDate.getDate() - postDate.day) <= 7){

      if(currentDate.getDate() - postDate.day == 1){
        date = "Yesterday at " + hours + ":" + minutes + " " + ampm;
      }else{
        date = weekday[postDate.weekday] + " at " + hours + ":" + minutes + " " + ampm;
      }
      
    }else if(currentDate.getDate() <= 7 && (currentDate.getMonth() - postDate.month) == 1){

      var maxMonthNum = 0;
      switch(postDate.month){
        case 0: case 2: case 4: case 6: case 7: case 9: case 11:
            maxMonthNum = 31;
            break;
        case 3: case 5: case 8:  case 10:
            maxMonthNum = 30;
            break;
        case 1:
            maxMonthNum = 28;
            break;
      }

      var EndOfMonthDistance = maxMonthNum - postDate.day;

      if(EndOfMonthDistance <= 6 && EndOfMonthDistance + currentDate.getDate() <= 7){

        if(postDate.day == maxMonthNum){
          date = "Yesterday at " + hours + ":" + minutes + " " + ampm;
        }else{
          date = weekday[postDate.weekday] + " at " + hours + ":" + minutes + " " + ampm;
        }

      }

    }

    this.setState({
      msgTime: date
    });
   
  }


  render() {
    return (
      <div className="message">
        <img src={`${this.props.data.img}`} alt="Profile Pic" className="msgProfPic"/>
        <p className="msgUsername">{this.props.data.username}</p>
        <p className="msgTime">{this.state.msgTime}</p>
        <p className="msgPost">{ this.props.data.connectionID == null ? "Message: " + this.props.data.post : "ConnectionID: " + this.props.data.connectionID + "\n" + "Message: " + this.props.data.post}</p>
      </div>
    );
  }
}
export default Message;
