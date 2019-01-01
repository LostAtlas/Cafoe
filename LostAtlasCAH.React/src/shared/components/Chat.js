import React, { Component } from "react";
import Message from "./Message";



var testMessageArrayList = [];

testMessageArrayList.push({
  img: "https://myanimeshelf.com/upload/dynamic/2018-08/16/7467921.jpg",
  username: "Neonkiddur",
  time: "Today at 5:00pm",
  post: "Hurry up and style this shit so we can watch anime! fucking weeb!!"
});
testMessageArrayList.push({
  img: "https://myanimeshelf.com/upload/dynamic/2018-08/16/7467921.jpg",
  username: "Neonkiddur",
  time: "Today at 5:00pm",
  post: "Hurry up and style this shit so we can watch anime! fucking weeb!!"
});
testMessageArrayList.push({
  img: "https://myanimeshelf.com/upload/dynamic/2018-08/16/7467921.jpg",
  username: "Neonkiddur",
  time: "Today at 5:00pm",
  post: "Hurry up and style this shit so we can watch anime! fucking weeb!!"
});



class Chat extends Component {

  constructor(props) {
    super(props);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.getScrollTopMax = this.getScrollTopMax.bind(this);
    this.scrollCheck = this.scrollCheck.bind(this);
    this.state = {
       itemArray: testMessageArrayList,
       scrollLock: true,
       scrollTopMax: 0,
       chatAlert: "hide",
       count: 0
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

  //function will be used when signalr is implement on this page
  sendMessage(){
    //connection.invoke("sendMessage", "Hello"));
  }
  
  // function will resemble "connection.on("receiveMessage", data => { });" in production
  receiveMessage(event){
    // Receives msg object from signalr hub 
    
    if(event.key == 'Enter'){  

      var inputMsg = this.post.value.trim();

      if(inputMsg != ""){

        var num = this.state.count++;
        this.setState({
          count: num
        })

        var msgHolder = {
          img: "https://myanimeshelf.com/upload/dynamic/2018-08/16/7467921.jpg",
          username: "Neonkiddur",
          time: "Today at " + this.state.count,
          post: inputMsg
        };

        this.post.value = ""; 
        testMessageArrayList.push(msgHolder);
     
        this.setState({
          itemArray: testMessageArrayList
        })
  
        if(this.state.scrollLock){
          setTimeout(this.scrollToBottom ,50);
        }else{
          this.setState({
            chatAlert: "show"
          })
        }

      }
    }
  }

  scrollToBottom(){
    
      //this.msgsContainer.removeEventListener('scroll', this.scrollCheck);
      this.msgsContainer.scrollTop = this.msgsContainer.scrollHeight;
      console.log(this.msgsContainer.scrollTop);
  
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
    console.log(this.msgsContainer.scrollTop + " : " + this.state.scrollTopMax);
    console.log(this.state.scrollLock);
  }

  render() {
    
    return (
      <div id="chat">
          <div onClick={this.scrollToBottom.bind(this)} className={this.state.chatAlert} id="chatAlert">
                  <p>New Messages Below</p>
                  <span>Click here...</span>
          </div>
          <div ref={(hold) => {this.msgsContainer = hold}} id="messages">
              {this.state.itemArray.map((item, index) => {
                return (
                  <Message key={index} data={item}/>
                )
              })}
          </div>
          <input ref={(hold) => {this.post = hold}} id="chatSubmit" type="text" placeholder="Enter message..." onKeyPress={this.receiveMessage.bind(this)}/>
      </div>
    );
  }
}
export default Chat;

