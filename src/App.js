import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import StackedHorizonalChart from './StackedHorizonalChart';
// import HorizontalChart from './HorizontalChart';
// import Barchart from './Barchart';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {/* <Barchart data={[5,10,1,3]} size={[500,500]} /> */}
        {/* <div class="chartContainer">
          <HorizontalChart size={[500, 500]} data={[
            { label: "Category 1", value: 19 },
            { label: "Category 2", value: 5 },
            { label: "Category 3", value: 13 },
            { label: "Category 4", value: 17 },
            { label: "Category 5", value: 19 },
            { label: "Category 6", value: 27 }
          ]} chartContainer="hchart" />
        </div> */}
        <StackedHorizonalChart/>

      </div>
    );
  }
}

export default App;
