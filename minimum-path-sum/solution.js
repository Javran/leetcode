/**
 * @param {number[][]} grid
 * @return {number}
 */
const minPathSum = grid => {
  const M = grid.length
  if (M === 0)
    return 0
  const N = grid[0].length
  if (N === 0)
    return 0
  const f = new Array(M)
  for (let i = 0; i < M; ++i)
    f[i] = new Uint32Array(N)
  f[0][0] = grid[0][0]
  for (j = 1; j < N; ++j)
    f[0][j] = f[0][j-1] + grid[0][j]
  for (i = 1; i < M; ++i) {
    f[i][0] = f[i-1][0] + grid[i][0]
    for (j = 1; j < N; ++j) {
      f[i][j] = grid[i][j] + Math.min(f[i-1][j], f[i][j-1])
    }
  }
  return f[M-1][N-1]
}

console.log(minPathSum([
  [1,3,1],
  [1,5,1],
  [4,2,1],
  [9,2,3],
]))
