import React, { Component } from "react";
import Message from "./Message";


// testMessageArrayList will be used to display the intial test message inside of the chat.
var testMessageArrayList = [];

// testTime gets current date and time
var testTime = new Date();
        /* postTestTime is and object that holds needed information from the Date variable above. Putting that information in
        ** an object makes it easier to pass over the network. will be used in the test "message data object" below */
        var postTestTime = {
          weekday: testTime.getDay(),
          day: testTime.getDate(),
          month: testTime.getMonth(),
          year: testTime.getFullYear(),
          hour: testTime.getHours(),
          minutes: testTime.getMinutes()
        }

// Adds a test "message data object" to testMessageArrayList
testMessageArrayList.push({
  img: "https://myanimeshelf.com/upload/dynamic/2018-08/16/7467921.jpg",
  username: "Neonkiddur-sama",
  date: postTestTime,
  post: "To test chat, open multiple tabs of this page and type away."
});


class Chat extends Component {

  constructor(props) {
    super(props);
    // binds each listed methods to the class and set that bind to a variable with the name syntax this.MethodName 
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.getScrollTopMax = this.getScrollTopMax.bind(this);
    this.scrollCheck = this.scrollCheck.bind(this);
    this.showThumb = this.showThumb.bind(this);
    this.receiveMessage = this.receiveMessage.bind(this);

    //Declaring state variables
    this.state = {
       itemArray: testMessageArrayList,
       scrollLock: true,
       scrollTopMax: 0,
       chatAlert: "hide",
       autoScroll: "showThumb"
    }
  } 

  // Native method of every Component Class that runs code after all parent class components are rendered.
  componentDidMount() {
    //runs method getScrollTopMax
    this.getScrollTopMax();
    //adds event listeners 
    window.addEventListener('resize', this.getScrollTopMax);
    this.msgsContainer.addEventListener('scroll', this.scrollCheck);
  }

  // Native method of every Component Class that runs code when you navigate to a new page/component.
  componentWillUnmount() {
    //removes event listeners 
    window.removeEventListener('resize', this.getScrollTopMax);
    this.msgsContainer.removeEventListener('scroll', this.scrollCheck);
  }

  /* Method that runs when a user types inside of the chat input box. 
  ** It sends the typed message to the hello function in the signalr hub when the user clicks enter. */
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

          var jsonMsg = JSON.stringify(msgHolder);
          this.props.isConnected.connectionHub.invoke("Hello", jsonMsg);
        
          this.post.value = ""; 
        }
      }
    }
  }
  
  /* Method that runs when The parent component receives new chat messages from the signalr hub. 
  ** It sends each message to the Message component, which renders the new message inside the chat. */
  receiveMessage(msg){

    var msgObj= {};
    try {
      var msgObj = JSON.parse(msg);
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

  /* Method that automatically scrolls to the bottom of the chat message window. 
  **  */
  scrollToBottom(){
      this.msgsContainer.scrollTop = this.msgsContainer.scrollHeight;
      setTimeout(this.showThumb(),10000);
  }

  /* Method that sets the autoScroll state variable to showThumb. 
  ** Used in adding dynamic css to the chat message window to hide and show scroll thumb */
  showThumb(){
    this.setState({
      autoScroll: "showThumb"
    });
  }
  
  /* Method that sets the scrollTopMax state variable to the max height of the scrollable area of the caht message window. 
  ** Used to automatically keep the chat messsage window at the bottom when new messages come in. */
  getScrollTopMax(){
    var value = this.msgsContainer.scrollHeight - this.msgsContainer.offsetHeight;
    value++;
    this.setState({
      scrollTopMax: value
    });
  }

  /* Method that sets scrollLock state variable to true if user scrolls to the bottom of the chat window and false when they scroll up. 
  ** Used to keep the chat message window at the bottom when new messages come in.
  ** Also sets the chatAlert state variable to hide or show. 
  ** Used to display an element that (when clicked) jumps the chat messages window to the bottom to display new messages */
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

  /* Render's html. 
  **  */
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

