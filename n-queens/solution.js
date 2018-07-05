/**
 * @param {number} n
 * @return {string[][]}
 */
const solveNQueens = n => {
  // board[row] = col (0-based)
  const board = new Uint8Array(n)
  const used = new Uint8Array(n)
  const diag1 = new Uint8Array(n*2)
  const diag2 = new Uint8Array(n*2)
  const ans = []

  const pprStrs = new Array(n)
  for (let i = 0; i < n; ++i) {
    pprStrs[i] = '.'.repeat(i) + 'Q' + '.'.repeat(n-i-1)
  }

  const go = row => {
    if (row === n) {
      ans.push([...board].map(i => pprStrs[i]))
      return
    }
    for (let col = 0; col < n; ++col) {
      const a = row+col
      const b = row+n-col
      if (!used[col] && !diag1[a] && !diag2[b]) {
        used[col] = 1
        diag1[a] = 1
        diag2[b] = 1
        board[row] = col
        go(row+1)
        used[col] = 0
        diag1[a] = 0
        diag2[b] = 0
      }
    }
  }
  go(0)
  return ans
}

console.log(solveNQueens(8))
