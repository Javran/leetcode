/**
 * @param {number[][]} nums
 * @param {number} r
 * @param {number} c
 * @return {number[][]}
 */
const matrixReshape = (nums, rows, cols) => {
  const rows0 = nums.length
  if (rows0 === 0)
    return nums
  const cols0 = nums[0].length
  if (
    cols0 === 0 ||
    rows0 * cols0 !== rows * cols ||
    (rows0 === rows && cols0 === cols)
  )
    return nums

  function *getNext() {
    for (let i = 0; i < rows0; ++i) {
      for (let j = 0; j < cols0; ++j) {
        yield nums[i][j]
      }
    }
  }

  const g = getNext()

  const ret = new Array(rows)
  for (let i = 0; i < rows; ++i) {
    ret[i] = new Array(cols)
    for (let j = 0; j < cols; ++j) {
      ret[i][j] = g.next().value
    }
  }

  return ret
}


const {cTestFunc} = require('leetcode-zwischenzug')
const f = cTestFunc(matrixReshape)

f([[1,2],[3,4]],1,4)([[1,2,3,4]])
f([[1,2],[3,4]],2,4)([[1,2],[3,4]])
