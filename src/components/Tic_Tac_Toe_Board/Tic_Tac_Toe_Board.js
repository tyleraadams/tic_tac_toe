import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { makePlayerMove } from '../../redux/actions';
import './Tic_Tac_Toe_Board.css';

class TicTacToeBoard extends Component {
  handleClick(rowIndex, spaceIndex) {
    return function() {
      this.props.onSpaceClick([rowIndex, spaceIndex], 'x');

    }.bind(this);
  }

  render() {
    return <div className="board">{this.props.board.map(function mapBoard(row, rowIndex) {
      return <div key={`${row}-${rowIndex}`} className={`board__row board__row--${row.length}`}>
        {row.map(function mapRow(space, spaceIndex) {
          return (
            <div key={`${row}-${rowIndex}-${spaceIndex}`} className="board__space" onClick={this.handleClick(rowIndex, spaceIndex)}>
              {space ? space : ''}
            </div>
          );
        }.bind(this))}
        </div>
    }.bind(this))}</div>;
  }
}

function mapStateToProps(state) {
  return {
    board: state.board
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSpaceClick: function(coords, mark) {
      dispatch(makePlayerMove(coords, mark));
    }
  }
}

TicTacToeBoard.propTypes = {
  board: PropTypes.arrayOf(PropTypes.array).isRequired,
  onSpaceClick: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(TicTacToeBoard);
