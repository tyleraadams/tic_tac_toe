import { combineReducers } from 'redux'
import board from './board'
import gameStatus from './game_status';

const baseReducer = combineReducers({
  board,
  gameStatus
});

export default baseReducer;
