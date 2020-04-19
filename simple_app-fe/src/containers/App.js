import React, { Component, Fragment } from "react";
import Home from "../components/Home/Home";
import '../style/main.scss';

class App extends Component {
  render() {
    return (
      <div>
        <Fragment>
          <Home />
        </Fragment>
        <a href="https://github.com/papstchaka" target="_blank" style={{position: "fixed", color: "black", bottom: "5px", right: "5px"}}>[2020] Alexander Christoph</a>
      </div>
    );
  }
}

export default App;
