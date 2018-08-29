/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
const rotate = mat => {
  /*
     idea:
     the following two should both work:

     - transpose then reverse row by row

     or

     - reverse then transpose (our algorithm)
   */
  const n = mat.length
  if (n <= 1)
    return

  mat.reverse()
  // in-place transpose
  for (let i = 0; i < n; ++i) {
    for (let j = i+1; j < n; ++j) {
      const tmp = mat[i][j]
      mat[i][j] = mat[j][i]
      mat[j][i] = tmp
    }
  }
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(function testRotate(mat) {
  rotate(mat)
  return mat
})

f([
  [1,2,3],
  [4,5,6],
  [7,8,9],
])([
  [7,4,1],
  [8,5,2],
  [9,6,3],
])
f([
  [ 5, 1, 9,11],
  [ 2, 4, 8,10],
  [13, 3, 6, 7],
  [15,14,12,16],
])([
  [15,13, 2, 5],
  [14, 3, 4, 1],
  [12, 6, 8, 9],
  [16, 7,10,11],
])
