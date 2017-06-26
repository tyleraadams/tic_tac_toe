import React, { Component } from 'react';
import './App.css';
import TicTacToeBoard from '../Tic_Tac_Toe_Board/Tic_Tac_Toe_Board';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TicTacToeBoard />
      </div>
    );
  }
}

export default App;
