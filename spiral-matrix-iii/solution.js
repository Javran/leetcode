/**
 * @param {number} R
 * @param {number} C
 * @param {number} r0
 * @param {number} c0
 * @return {number[][]}
 */
const spiralMatrixIII = (R, C, r0, c0) => {
  /*
     idea: do what's asked.
     We have sufficient time so don't need to think about speeding this up.
   */
  let r = r0, c = c0, dir = 0, step = 1
  const dirs = [ [0,1], [1,0], [0,-1], [-1,0] ]
  const SIZE = R*C
  const ans = [[r,c]]
  const record = () => {
    if (0 <= r && r < R && 0 <= c && c < C)
      ans.push([r,c])
  }
  while (ans.length < SIZE) {
    const [dx, dy] = dirs[dir]
    for (let i = 0; i < step; ++i) {
      r = r + dx
      c = c + dy
      record()
    }
    if (dir === 0) {
      dir = 1
    } else if (dir === 1) {
      dir = 2
      ++step
    } else if (dir === 2) {
      dir = 3
    } else if (dir === 3) {
      dir = 0
      ++step
    }
  }
  return ans
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(spiralMatrixIII)
f(1,4,0,0)([[0,0],[0,1],[0,2],[0,3]])
f(5,6,1,4)([[1,4],[1,5],[2,5],[2,4],[2,3],[1,3],[0,3],[0,4],[0,5],[3,5],[3,4],[3,3],[3,2],[2,2],[1,2],[0,2],[4,5],[4,4],[4,3],[4,2],[4,1],[3,1],[2,1],[1,1],[0,1],[4,0],[3,0],[2,0],[1,0],[0,0]])
