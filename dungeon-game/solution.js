const { randomIntGenBetween } = require('leetcode-zwischenzug')
/**
 * @param {number[][]} dungeon
 * @return {number}
 */
const calculateMinimumHP = d => {
  if (d.length === 0 || d[0].length === 0)
    return 1

  /*
     let f[i][j] be min HP required to enter cell (i,j):

     - f[i][j] = min(f[i+1][j], f[i][j+1]) - d[i][j]

     since it's not allowed for HP to drop below 1,
     we further require f[i][j] >= 1.

   */
  const rows = d.length
  const cols = d[0].length
  const f = new Array(rows)
  for (let i = 0; i < rows; ++i)
    f[i] = new Int32Array(cols)

  // last row special
  f[rows-1][cols-1] = Math.max(1, 1 - d[rows-1][cols-1])
  let row = rows-1
  for (let j = cols-2; j >= 0; --j)
    f[row][j] = Math.max(1, f[row][j+1] - d[row][j])
  // last col special
  let col = cols-1
  for (let i = rows-2; i >= 0; --i)
    f[i][col] = Math.max(1, f[i+1][col] - d[i][col])
  for (let i = rows-2; i >= 0; --i) {
    for (let j = cols-2; j >= 0; --j) {
      let tmp = Math.min(f[i+1][j], f[i][j+1]) - d[i][j]
      f[i][j] = tmp > 1 ? tmp : 1
    }
  }
  return f[0][0]
}

const g = randomIntGenBetween(-20,5)
const gl =  randomIntGenBetween(2,3)
const rows = gl()
const cols = gl()

const d = new Array(rows)
for (let i = 0; i < rows; ++i) {
  d[i] = new Array(cols)
  for (let j = 0; j < cols; ++j) {
    d[i][j] = g()
  }
}

console.log(JSON.stringify(d), calculateMinimumHP(d))
