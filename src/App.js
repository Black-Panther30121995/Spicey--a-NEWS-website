import './App.css';

import React, { Component } from 'react'

export default class App extends Component {
  c='Jasmine'
  render() {
    return (
      <div>
        This is my first class based component. {this.c}!!
      </div>
    )
  }
}

