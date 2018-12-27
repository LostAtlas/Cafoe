import React, { Component } from "react";
const css = require('../css/style.css');
// im a comment
import Navigation from './Navigation';
import Content from './Content';

class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <Content />
      </div>
    );
  }
}
export default App;