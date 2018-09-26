/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
const findDiagonalOrder = mat => {
  const rows = mat.length
  if (rows === 0)
    return []
  const cols = mat[0].length
  if (cols === 0)
    return []
  const ans = []
  for (let dSum = 0; dSum <= rows + cols - 2; ++dSum) {
    let r, c
    // r + c === dSum
    if (dSum & 1) {
      // going down-left
      if (dSum < cols) {
        c = dSum
        r = 0
      } else {
        c = cols - 1
        r = dSum - c
      }
      while (r < rows && c >= 0) {
        ans.push(mat[r][c])
        ++r
        --c
      }
    } else {
      // going up-right
      if (dSum < rows) {
        r = dSum
        c = 0
      } else {
        r = rows - 1
        c = dSum - r
      }
      while (r >= 0 && c < cols) {
        ans.push(mat[r][c])
        --r
        ++c
      }
    }
  }
  return ans
}

const {cTestFunc} = require('leetcode-zwischenzug')
const f = cTestFunc(findDiagonalOrder)

f([
  [ 1, 2, 3 ],
  [ 4, 5, 6 ],
  [ 7, 8, 9 ]
])([1,2,4,7,5,3,6,8,9])

f([
  [1,2,3,4],
  [5,6,7,8],
  [4,3,2,1],
])([1,2,5,4,6,3,4,7,3,2,8,1])

f([[1,2,3,4,5]])([1,2,3,4,5])
f([[1],[2],[3],[4]])([1,2,3,4])

f([
  [1,2],
  [3,4],
  [5,6],
  [7,8],
])([1,2,3,5,4,6,7,8])
