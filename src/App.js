import "./App.css";
import Navbar from "./components/Navbar";
import React, { Component } from "react";
import News from "./components/News";
import { BrowserRouter as Router } from "react-router-dom";  // Import BrowserRouter

export default class App extends Component {
  render() {
    return (
      <Router>  {/* Wrap everything inside Router */}
        <div>
          <Navbar />
          <News />
        </div>
      </Router>
    );
  }
}
