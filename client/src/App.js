import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  componentDidMount() {
    axios
      .get("http://localhost:3002/api/product/brands")
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error.response);
      });
  }
  render() {
    return <div className="App">My App</div>;
  }
}

export default App;
