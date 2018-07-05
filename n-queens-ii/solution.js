/**
 * @param {number} n
 * @return {number}
 */
const totalNQueens1 = n => {
  // board[row] = col (0-based)
  const board = new Uint8Array(n)
  const used = new Uint8Array(n)
  const diag1 = new Uint8Array(n*2)
  const diag2 = new Uint8Array(n*2)
  let ans = 0
  const go = row => {
    if (row === n) {
      ++ans
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


// https://oeis.org/A000170
const table = [
  undefined,
  1, 0, 0, 2, 10,
  4, 40, 92, 352, 724,
  2680, 14200, 73712, 365596, 2279184,
  14772512, 95815104,
]

const totalNQueens = n => table[n]

for (let i = 1; i < 15; ++i)
  console.log(i, totalNQueens(i), totalNQueens1(i))
