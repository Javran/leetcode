/**
 * @param {number[][]} grid
 * @return {number}
 */
const projectionArea = grid => {
  /*
     idea:
     - xy-plane is simply 0-1 info of the grid
     - yz-plane and xz-plane are just max of rows / cols
   */
  const N = grid.length
  const rowMaxs = new Uint16Array(N)
  const colMaxs = new Uint16Array(N)
  let planeXY = 0
  for (let i = 0; i < N; ++i) {
    for (let j = 0; j < N; ++j) {
      if (grid[i][j] > 0) {
        ++planeXY
      }
      if (rowMaxs[i] < grid[i][j])
        rowMaxs[i] = grid[i][j]
      if (colMaxs[j] < grid[i][j])
        colMaxs[j] = grid[i][j]
    }
  }
  const add = (x,y) => x + y
  return planeXY + rowMaxs.reduce(add, 0) + colMaxs.reduce(add, 0)
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(projectionArea)
f([[1,0],[0,2]])(8)
f([[1,1,1],[1,0,1],[1,1,1]])(14)
f([[2,2,2],[2,1,2],[2,2,2]])(21)
