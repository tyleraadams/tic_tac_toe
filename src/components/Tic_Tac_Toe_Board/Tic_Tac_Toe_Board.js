import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { makePlayerMove, changeGameStatus } from '../../redux/actions';
import './Tic_Tac_Toe_Board.css';

class TicTacToeBoard extends Component {
  constructor() {
    super();
    this.handleRestartClick = this.handleRestartClick.bind(this);
    this.symbolsMap = {
      x: <svg width="75" height="75" viewBox="0 0 300 300" version="1.1" xmlns="http://www.w3.org/2000/svg"><g stroke="none" strokeWidth="3" fill="none" fillRule="evenodd"><g id="Artboard" stroke="#000000"><path d="M300,300 L0,0 L300,300 Z" id="Path"></path><path d="M-1.41796875,300.15625 L301.757812,-0.21484375 L-1.41796875,300.15625 Z" id="Path-2"></path></g></g></svg>,
      O: <svg width="75" height="75" viewBox="0 0 300 300" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="Page-1" stroke="none" strokeWidth="3" fill="none" fillRule="evenodd"><g id="Artboard" stroke="#000000"><circle id="Oval" cx="150" cy="150" r="150"></circle></g></g></svg>
    }
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
        {/*<ReactCSSTransitionGroup
        transitionName="example"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnter={false}
        transitionLeave={false}>*/}
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
                      onClick={this.props.gameStatus === 'IN_PROGRESS' && space === 0 ? this.handleBoardClick(rowIndex, spaceIndex) : null}>
                      {space ? this.symbolsMap[space] : ''}
                    </div>

                  );
                }.bind(this))}
              </div>)
          }.bind(this))}
        {/*</ReactCSSTransitionGroup>*/}
      </div>

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
