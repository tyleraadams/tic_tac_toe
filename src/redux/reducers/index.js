import { combineReducers } from 'redux'
import board from './board'

const baseReducer = combineReducers({
  board
});

export default baseReducer;
