const {memoize} = require('underscore')
/**
 * @param {number} n
 * @return {string[][]}
 */
const solveNQueens = n => {
  // board[row] = col (0-based)
  const board = new Uint8Array(n)
  const used = new Uint8Array(n)
  const ans = []

  const pprRow = memoize(ind =>
    '.'.repeat(ind) + 'Q' + '.'.repeat(n-ind-1)
  )

  const go = dep => {
    if (dep === n) {
      ans.push([...board].map(pprRow))
      return
    }
    const avoid = new Uint8Array(n)
    for (let row = 0; row < dep; ++row) {
      const col = board[row]
      const l = row+col-dep
      const r = dep-row+col
      if (l >= 0 && l < n)
        avoid[l] = 1
      if (r >= 0 && r < n)
        avoid[r] = 1
    }
    for (let col = 0; col < n; ++col) {
      if (!used[col] && !avoid[col]) {
        used[col] = 1
        board[dep] = col
        go(dep+1)
        used[col] = 0
      }
    }
  }
  go(0)
  return ans
}

solveNQueens(4)
