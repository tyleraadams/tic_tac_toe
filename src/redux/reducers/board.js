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
    default:
      return state;
  }
};


export default board;
