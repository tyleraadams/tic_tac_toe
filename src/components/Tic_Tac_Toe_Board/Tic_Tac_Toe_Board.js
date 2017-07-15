import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { makePlayerMove, changeGameStatus } from '../../redux/actions';
import './Tic_Tac_Toe_Board.css';

class TicTacToeBoard extends Component {
  constructor() {
    super();
    this.handleRestartClick = this.handleRestartClick.bind(this);
  }

  handleBoardClick(rowIndex, spaceIndex) {
    return function() {
      this.props.onSpaceClick([rowIndex, spaceIndex], 'x');
    }.bind(this);
  }

  handleRestartClick() {
    return this.props.onRestartClick();
  }

  render() {
    return (
      <div>
      <h4>{this.props.gameStatus}</h4>
      <button onClick={this.handleRestartClick}>Restart</button>
      <div className="board">
        {this.props.board.map(function mapBoard(row, rowIndex) {
          return (
            <div
              key={`${row}-${rowIndex}`}
              className={`board__row board__row--${row.length}`}>
              {row.map(function mapRow(space, spaceIndex) {
                return (
                  <div
                    key={`${row}-${rowIndex}-${spaceIndex}`}
                    className="board__space"
                    onClick={this.handleBoardClick(rowIndex, spaceIndex)}>
                    {space ? space : ''}
                  </div>
                );
              }.bind(this))}
            </div>)
        }.bind(this))}</div>
      </div>
      );
  }
}

function mapStateToProps(state) {
  return {
    board: state.board,
    gameStatus: state.gameStatus
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSpaceClick: function(coords, mark) {
      dispatch(makePlayerMove(coords, mark));
    },
    onRestartClick: function() {
      dispatch(changeGameStatus('RESTART_GAME'));
    }
  }
}

TicTacToeBoard.propTypes = {
  board: PropTypes.arrayOf(PropTypes.array).isRequired,
  gameStatus: PropTypes.string.isRequired,
  onSpaceClick: PropTypes.func.isRequired,
  onRestartClick: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(TicTacToeBoard);
