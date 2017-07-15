const DEFAULT = 'IN_PROGRESS';

const board = (state = DEFAULT, action) => {
  switch(action.type) {
    case 'CHANGE_GAME_STATUS':
     return action.gameStatus === 'RESTART_GAME' ? DEFAULT : action.gameStatus;
    default:
      return state;
  }
};

export default board;
