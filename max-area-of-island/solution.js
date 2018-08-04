/**
 * @param {number[][]} grid
 * @return {number}
 */
const maxAreaOfIsland = grid => {
  /*
     idea: disjoint set will certainly do,
     but I just want to see how it looks like with DFS.
     time complexity is O(rows * cols):

     - every cell is visited once to see if it can be expanded in any of the 4 directions
     - an extra loop is used to scan through cells to detect black cells
       which is of course O(rows * cols)
   */
  const rows = grid.length
  if (rows === 0)
    return 0
  const cols = grid[0].length
  if (cols === 0)
    return 0
  const visited = new Array(rows)
  for (let i = 0; i < rows; ++i) {
    visited[i] = new Uint8Array(cols)
  }
  const countArea = (x,y) => {
    visited[x][y] = 1
    let ret = 1
    const tryCoord = (u,v) => {
      if (grid[u][v] && !visited[u][v])
        ret += countArea(u,v)
    }
    if (x > 0)
      tryCoord(x-1,y)
    if (x+1 < rows)
      tryCoord(x+1,y)
    if (y > 0)
      tryCoord(x,y-1)
    if (y+1 < cols)
      tryCoord(x,y+1)
    return ret
  }

  let ans = 0
  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      if (grid[i][j] === 1 && !visited[i][j]) {
        const area = countArea(i,j)
        if (area > ans)
          ans = area
      }
    }
  }
  return ans
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(maxAreaOfIsland)
f([
  [1,1,0,0,0],
  [1,1,0,0,0],
  [0,0,0,1,1],
  [0,0,0,1,1]]
)(4)
f([
  [0,0,1,0,0,0,0,1,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,1,1,0,0,0],
  [0,1,1,0,1,0,0,0,0,0,0,0,0],
  [0,1,0,0,1,1,0,0,1,0,1,0,0],
  [0,1,0,0,1,1,0,0,1,1,1,0,0],
  [0,0,0,0,0,0,0,0,0,0,1,0,0],
  [0,0,0,0,0,0,0,1,1,1,0,0,0],
  [0,0,0,0,0,0,0,1,1,0,0,0,0]
])(6)
f([[0,0,0,0,0,0,0,0]])(0)
