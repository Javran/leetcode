/**
 * @param {string} moves
 * @return {boolean}
 */
const judgeCircle = moves => {
  // simulation should be good enough
  let x = 0, y = 0
  for (let i = 0; i < moves.length; ++i) {
    const m = moves[i]
    if (m === 'U')
      x -= 1
    else if (m === 'D')
      x += 1
    else if (m === 'L')
      y -= 1
    else if (m === 'R')
      y += 1
  }
  return x === 0 && y === 0
}
