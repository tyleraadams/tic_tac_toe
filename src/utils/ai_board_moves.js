import flattenDepth from 'lodash/flattenDepth';

export function chooseCell(board) {
  const coords = assignCoords(board);

  return coords;
}

function assignCoords(board) {
  const filtered = flattenDepth(board.map(function convertRow(row, rowIndex) {
    return row.map(function convertCells(cell, cellIndex) {
      const coords = [rowIndex, cellIndex]
      coords.value = cell;
      return coords;
    });
  }), 1).filter(function filterCoords(coords) {
    return coords.value === 0;
  });
  let coords = getCoords(filtered);
  return coords;
}

function getCoords(possibleCoords) {
  const max = possibleCoords.length - 1;

  return possibleCoords[generateRandomBetween(0, max)];
}

function generateRandomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
