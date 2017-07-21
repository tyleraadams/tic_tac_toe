export function checkForGameOver(board) {
  return board.reduce(function reduceBoard(accumulator, curr) {
    return accumulator.concat(curr);
  }, []).indexOf(0) === -1;
}

export function checkForWin(board, mark, coords) {
  const horizontalResults = board.map((row) => {
    return checkForHorizontalWin(row) === mark
  }).indexOf(true) !== -1;

  const verticalResults = checkForVerticalWin(board, coords, mark);
  const diagonalResults = checkForDiagonalWin(board, coords, mark);

  return horizontalResults || verticalResults  || diagonalResults;
}


function checkForHorizontalWin(row) {
 return row.reduce(function reduceRow(accumulator, curr) {
    return accumulator === curr ? accumulator : false;
  });
}

function checkForVerticalWin(board, coords, mark) {
  const col = coords[1];

  return board.map(function(row) {
    return row[col];
  }).reduce(function(acc, curr, idx, arr) {
    return acc === curr ? acc : false;
  });
}

function checkForDiagonalWin(board, coords, mark) {
  const result = [getForwardSlash(coords, board), getBackSlash(coords, board)].filter((arr)=> {
    return arr.length === board[0].length;
  }).map(checkForHorizontalWin).indexOf(mark) !== -1;
  return result;
}

function getForwardSlash(coords, board) {
  const maxLength = board[0].length;
  let xCounter = coords[0];
  let yCounter = coords[1];
  let result = [];
  while (xCounter > 0 && yCounter + 1 < maxLength) {
    xCounter--;
    yCounter++;
  }

  while (xCounter < maxLength && yCounter >= 0) {
    result.push(board[xCounter][yCounter]);
    xCounter++;
    yCounter--;
  }

  return result;
}

function getBackSlash(coords, board) {
  const maxLength = board[0].length;
  let xCounter = coords[0];
  let yCounter = coords[1];
  let result = [];


  while (xCounter > 0 && yCounter > 0) {
    xCounter--;
    yCounter--;
  }

  while (xCounter < maxLength && yCounter < maxLength) {
    result.push(board[xCounter][yCounter]);
    xCounter++;
    yCounter++;
  }

  return result;
}
