import "./App.css";
import Navbar from "./components/Navbar";
import News from "./components/News";
import Article from "./components/Article";
import About from "./components/About"; // Import About component
import React, { Component } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom"; // Using HashRouter for GitHub Pages

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<News />} />
            <Route path="/article/:title" element={<Article />} />
            <Route path="/about" element={<About />} /> {/* Add About route */}
          </Routes>
        </div>
      </Router>
    );
  }
}