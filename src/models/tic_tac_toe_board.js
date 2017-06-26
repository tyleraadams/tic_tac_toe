export default function({width, height}) {
  const xCounter = width;
  let yCounter = height;
  const state = [];

  for (yCounter; yCounter > 0; yCounter--) {
    let row = [];
    let thisRowXCounter = xCounter;
    for (thisRowXCounter; thisRowXCounter > 0; thisRowXCounter--) {
      row.push(0);
    }
    state.push(row);
  }

  return state;
}
