import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// import StackedHorizonalChart from './StackedHorizonalChart';
import StackedHorizonalBarChart from './StackedHorizontalBarChart';
import HorizontalChart from './HorizontalChart';
import Barchart from './Barchart';

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
        {/* <HorizontalChart/> */}
        {/* <StackedHorizonalChart/> */}
        <div className="chartContainer">
          <StackedHorizonalBarChart 
          data={
            [
            // {date: "COMMERCE BANK",total: 8, tickerNotSent: 2,tickerSent: 3, tickerSentPercent: 10, tickerNotSentPercent: 25 },
            // {date: "MORGAN STANLEY",total: 10, tickerNotSent: 2,tickerSent: 3, tickerSentPercent: 10, tickerNotSentPercent: 25 },
            
            {date: "COMMERCE BANK",total: 8, tickerNotSent: 2,tickerSent: 3, tickerSentPercent: 37.5, tickerNotSentPercent: 25 },
            {date: "GRANTHAM, MAYO, VAN OTTERLOO",total: 23,tickerNotSent: 12,tickerSent: 9, tickerSentPercent: 8, tickerNotSentPercent: 10},
            {date: "GOLDMAN SACHS",total: 37,tickerNotSent: 10,tickerSent: 27, tickerSentPercent: 8, tickerNotSentPercent: 10},
            {date: "JP MORGAN",total: 40,tickerNotSent: 20,tickerSent: 15, tickerSentPercent: 8, tickerNotSentPercent: 10},
            {date: "MORGAN STANLEY",total: 52,tickerNotSent: 12,tickerSent: 40, tickerSentPercent: 8, tickerNotSentPercent: 10},
            {date: "GOLDMAN SACHS",total: 60,tickerNotSent: 40,tickerSent: 9, tickerSentPercent: 8, tickerNotSentPercent: 10}
            ]
          } />
        </div>
      </div>
    );
  }
}

export default App;
