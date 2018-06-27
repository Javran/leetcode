/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */
const updateMatrix = mat => {
  // idea: do a BFS, should be good enough to cover all cells.
  const rows = mat.length
  if (rows === 0)
    return mat
  const cols = mat[0].length
  if (cols === 0)
    return mat
  const ans = new Array(rows)
  const queue = []
  for (let i = 0; i < rows; ++i) {
    ans[i] = new Array(cols).fill(null)
    for (let j = 0; j < cols; ++j) {
      if (mat[i][j] === 0) {
        // all 0s are starting points for BFS
        queue.push([i,j,0 /* depth */])
      }
    }
  }
  let qHead = 0
  while (qHead < queue.length) {
    const [x,y,dep] = queue[qHead]
    const tryInsert = (x,y) => {
      if (ans[x][y] === null)
        queue.push([x, y, dep+1])
    }
    ++qHead
    // when it's possible to update.
    if (ans[x][y] === null) {
      ans[x][y] = dep
      // extend.
      if (x > 0) {
        tryInsert(x-1,y)
      }
      if (x+1 < rows) {
        tryInsert(x+1,y)
      }
      if (y > 0) {
        tryInsert(x,y-1)
      }
      if (y+1 < cols) {
        tryInsert(x,y+1)
      }
    }
  }
  return ans
}

console.log(updateMatrix(
  [
    [0,1,1,1],
    [1,1,1,1],
    [1,1,1,1],
  ]
))
