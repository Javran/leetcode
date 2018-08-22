/**
 * @param {character[][]} matrix
 * @return {number}
 */
const maximalRectangle = mat => {
  /*
     idea:

     same as in https://leetcode.com/problems/largest-rectangle-in-histogram/

     we first construct `hs`, which are heights as we scan row by row,
     then the same algorithm in largest-rectangle-in-histogram can be applied here for an O(n) complexity,
     resulting in overall time complexity of O(n*m) where n and m are dimensions of the input.

   */
  const rows = mat.length
  if (rows === 0)
    return 0
  const cols = mat[0].length
  if (cols === 0)
    return 0
  const hs = new Uint16Array(cols)
  const leftInd = new Uint16Array(cols)
  const rightInd = new Uint16Array(cols)
  /*
     following two assignments are for every rows and
     won't be changed throughout the algorithm,
     so we might as well set them up here.
   */
  // leftInd[0] = 0, no need to actually perform this.
  rightInd[cols-1] = cols-1
  let ans = 0
  for (let i = 0; i < rows; ++i) {
    // update heights
    for (let j = 0; j < cols; ++j) {
      if (mat[i][j] === '1') {
        ++hs[j]
      } else {
        hs[j] = 0
      }
    }

    for (let j = 1; j < cols; ++j) {
      if (hs[j] > hs[j-1]) {
        leftInd[j] = j
      } else {
        let k = j-1
        while (k > 0 && hs[k-1] >= hs[j]) {
          k = leftInd[k-1]
        }
        leftInd[j] = k
      }
    }

    for (let j = cols-2; j >= 0; --j) {
      if (hs[j] > hs[j+1]) {
        rightInd[j] = j
      } else {
        let k = j+1
        while (k < cols-1 && hs[k+1] >= hs[j]) {
          k = rightInd[k+1]
        }
        rightInd[j] = k
      }
    }
    for (let j = 0; j < cols; ++j) {
      if (hs[j] > 0) {
        const cur = hs[j] * (rightInd[j]-leftInd[j]+1)
        if (ans < cur) {
          ans = cur
        }
      }
    }
  }
  return ans
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(maximalRectangle)
f(["10100", "10111", "11111","10010"])(6)
f(["0001000", "0011100", "0111110", "0111110", "0011100", "0001000"])(12)
