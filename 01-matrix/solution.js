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
    ++qHead
    if (
      ans[x][y] === null
    ) {
      // when it's possible to update.
      ans[x][y] = dep
      // extend.
      if (x > 0) {
        queue.push([x-1, y, dep+1])
      }
      if (x+1 < rows) {
        queue.push([x+1, y, dep+1])
      }
      if (y > 0) {
        queue.push([x, y-1, dep+1])
      }
      if (y+1 < cols) {
        queue.push([x, y+1, dep+1])
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
