import { chooseCell } from '../../utils/ai_board_moves';
import { checkForGameOver, checkForWin } from '../../utils/board_utils';

export function markSpace(coords, mark) {
  return {
    type: 'MARK_SPACE',
    coords,
    mark
  };
}

export function changeGameStatus(gameStatus, winner) {
  return {
    type: 'CHANGE_GAME_STATUS',
    gameStatus,
    winner
  }
}

export function makePlayerMove(coords, mark) {
  return function (dispatch, getState) {
    dispatch(markSpace(coords, mark));
    let state = getState();
    let currBoard = state.board;

    runCheckForWin(dispatch, currBoard, mark, coords)
    state = getState();
    currBoard = state.board;
    let status = state.gameStatus;

    if (status === 'IN_PROGRESS') {
      runCheckForGameOver(dispatch, currBoard);
    }

    state = getState();
    status = state.gameStatus;

    if (status === 'IN_PROGRESS') {
      makeAIMove(dispatch, getState, currBoard);
    }

  };
}

function makeAIMove(dispatch, getState, currBoard) {
  const AIMove = AIPlayerMove(currBoard);
  dispatch(markSpace(AIMove.coords, AIMove.mark));
  const updatedBoard = getState().board;

  runCheckForWin(dispatch, updatedBoard, AIMove.mark, AIMove.coords);

  runCheckForGameOver(dispatch, updatedBoard);
}

function runCheckForGameOver(dispatch, currBoard) {
  if (checkForGameOver(currBoard)) {
    return dispatch(changeGameStatus('GAME_OVER'));
  }
}

function runCheckForWin(dispatch, currBoard, mark, coords) {
  if (checkForWin(currBoard, mark, coords)) {
    dispatch(changeGameStatus('VICTORY', mark));
  }
}

function AIPlayerMove(board) {
  return {
    coords: chooseCell(board),
    mark: 'O'
  };
}


