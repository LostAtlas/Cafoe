import React, { Component } from "react";
import Message from "./Message";



var testMessageArrayList = [];


var testTime = new Date();
        var postTestTime = {
          weekday: testTime.getDay(),
          day: testTime.getDate(),
          month: testTime.getMonth(),
          year: testTime.getFullYear(),
          hour: testTime.getHours(),
          minutes: testTime.getMinutes()
        }

testMessageArrayList.push({
  img: "https://myanimeshelf.com/upload/dynamic/2018-08/16/7467921.jpg",
  username: "Neonkiddur-sama",
  date: postTestTime,
  post: "To test chat, open multiple tabs of this page and type away."
});


class Chat extends Component {

  constructor(props) {
    super(props);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.getScrollTopMax = this.getScrollTopMax.bind(this);
    this.scrollCheck = this.scrollCheck.bind(this);
    this.showThumb = this.showThumb.bind(this);
    this.receiveMessage = this.receiveMessage.bind(this);
    this.state = {
       itemArray: testMessageArrayList,
       scrollLock: true,
       scrollTopMax: 0,
       chatAlert: "hide",
       autoScroll: "showThumb"
    }
  } 

  componentDidMount() {
    
    this.getScrollTopMax();
    window.addEventListener('resize', this.getScrollTopMax);
    this.msgsContainer.addEventListener('scroll', this.scrollCheck);
  }

  componentWillUnmount() {
    window.msgsContainer.removeEventListener('resize', this.getScrollTopMax);
    this.msgsContainer.removeEventListener('scroll', this.scrollCheck);
  }


  sendMessage(event){

    if(event.key == 'Enter'){  
      
      if(this.props.isConnected.bool){
        
        var inputMsg = this.post.value.trim();
        
        if(inputMsg != ""){
        
          var currentTime = new Date();
          var postTime = {
            weekday: currentTime.getDay(),
            day: currentTime.getDate(),
            month: currentTime.getMonth(),
            year: currentTime.getFullYear(),
            hour: currentTime.getHours(),
            minutes: currentTime.getMinutes()
          }
        
          var msgHolder = {
            img: "https://myanimeshelf.com/upload/dynamic/2018-08/16/7467921.jpg",
            username: "Neonkiddur-kun",
            date: postTime,
            post: inputMsg
          };

          console.log(msgHolder);
          var jsonMsg = JSON.stringify(msgHolder);
          console.log(jsonMsg);
          this.props.isConnected.connectionHub.invoke("Hello", jsonMsg);
        
          this.post.value = ""; 
        }
      }
    }
  }
  
  
  receiveMessage(msg){
    console.log("Child function success");
    console.log(msg);

    var msgObj= {};
    try {
      var msgObj = JSON.parse(msg);
      console.log(msgObj);
    } catch (ex) {
      console.error(ex);
    }
     
    testMessageArrayList.push(msgObj);

    this.setState({
      itemArray: testMessageArrayList
    });
       
    if(this.state.scrollLock){
      this.setState({
        autoScroll: "hideThunb"
      });
      setTimeout(this.scrollToBottom ,50);
    }else{
      this.setState({
        chatAlert: "show"
      })
    }
     
  }

  scrollToBottom(){
      this.msgsContainer.scrollTop = this.msgsContainer.scrollHeight;
      setTimeout(this.showThumb(),10000);
  }

  showThumb(){
    this.setState({
      autoScroll: "showThumb"
    });
  }
  
  getScrollTopMax(){
    var value = this.msgsContainer.scrollHeight - this.msgsContainer.offsetHeight;
    value++;
    this.setState({
      scrollTopMax: value
    });
  }

  scrollCheck(){
    this.getScrollTopMax();

    if(!this.state.scrollLock && this.msgsContainer.scrollTop == this.state.scrollTopMax){
      this.setState({
        scrollLock: true,
        chatAlert: "hide"
      });
    }

    if(this.state.scrollLock && this.msgsContainer.scrollTop != this.state.scrollTopMax){
      this.setState({
        scrollLock: false
      });
    }
  }

  render() {
    return (
      <div id="chat">
          <div onClick={this.scrollToBottom.bind(this)} className={this.state.chatAlert} id="chatAlert">
                  <p>New Messages Below</p>
                  <span>Click here...</span>
          </div>
          <div ref={(hold) => {this.msgsContainer = hold}} className={this.state.autoScroll} id="messages">
              {this.state.itemArray.map((item, index) => {
                return (
                  <Message key={index} data={item}/>
                )
              })}
          </div>
          <input ref={(hold) => {this.post = hold}} id="chatSubmit" type="text" placeholder="Enter message..." onKeyPress={this.sendMessage.bind(this)}/>
      </div>
    );
  }
}
export default Chat;

