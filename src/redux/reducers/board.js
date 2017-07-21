import getBoard from '../../models/tic_tac_toe_board';
import boardConfig from '../../config/tic_tac_toe_board.json';

const board = (state = [], action) => {
  switch(action.type) {
    case 'MARK_SPACE':
      const rowIndex = action.coords[0];
      const spaceIndex = action.coords[1];
      return [
        ...state.slice(0, rowIndex),
        [
          ...state[rowIndex].slice(0, spaceIndex),
          action.mark,
          ...state[rowIndex].slice(spaceIndex + 1, state[rowIndex].length)
        ],
        ...state.slice(rowIndex + 1, state.length),
      ];
    case 'CHANGE_GAME_STATUS':
      return action.gameStatus === 'RESTART_GAME' ?
      getBoard({width: boardConfig.width, height: boardConfig.height}) :
      state;
    default:
      return state;
  }
};


export default board;
