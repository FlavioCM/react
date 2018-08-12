import React, { Component, Button } from 'react';
import { Badge } from 'react-md';
import './App.css';
import TimeForm from './components/timeForm';

class App extends Component {

  sumTime(e){
    return e;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Time Calculator</h1>
        </header>
        <TimeForm />
      </div>
    );
  }
}

export default App;
