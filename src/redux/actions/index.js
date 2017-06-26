import { chooseCell } from '../../utils/ai_board_moves';

export function markSpace(coords, mark) {
  return {
    type: 'MARK_SPACE',
    coords,
    mark
  };
}


export function makePlayerMove(coords, mark) {
  return function (dispatch, getState) {
    getState()
    dispatch(markSpace(coords, mark));
    const AIMove = AIPlayerMove(getState().board);
    dispatch(markSpace(AIMove.coords, AIMove.mark));
  };
}

function AIPlayerMove(board) {
  return {
    coords: chooseCell(board),
    mark: 'O'
  };
}
