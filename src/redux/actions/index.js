import { chooseCell } from '../../utils/ai_board_moves';
import { checkForGameOver, checkForWin } from '../../utils/board_utils';

export function markSpace(coords, mark) {
  return {
    type: 'MARK_SPACE',
    coords,
    mark
  };
}

export function changeGameStatus(gameStatus) {
  return {
    type: 'CHANGE_GAME_STATUS',
    gameStatus
  }
}

export function makePlayerMove(coords, mark) {
  return function (dispatch, getState) {
    dispatch(markSpace(coords, mark));
    const currBoard = getState().board;

    if(checkForGameOver(currBoard) || checkForWin(currBoard, mark, coords)) {
      return dispatch(changeGameStatus('GAME_OVER'));
    }

    const AIMove = AIPlayerMove(currBoard);
    dispatch(markSpace(AIMove.coords, AIMove.mark));
  };
}

function AIPlayerMove(board) {
  return {
    coords: chooseCell(board),
    mark: 'O'
  };
}


