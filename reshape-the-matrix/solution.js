/**
 * @param {number[][]} nums
 * @param {number} r
 * @param {number} c
 * @return {number[][]}
 */
const matrixReshape = (nums, rows, cols) => {
  /*
     idea: the use of generator gives us a decent and concise solution.
   */
  const rows0 = nums.length
  if (rows0 === 0)
    return nums
  const cols0 = nums[0].length

  if (
    // since rows and cols are positive,
    // we know this is impossible to shape
    cols0 === 0 ||
    // # of elements simply mismatch in this case
    rows0 * cols0 !== rows * cols ||
    // shapes are the same, nothing to do
    (rows0 === rows && cols0 === cols)
  )
    return nums

  // this generator allows us to keep the process of iterating
  // isolated and under control.
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
      // copy to target array by visiting the original one
      ret[i][j] = g.next().value
    }
  }

  return ret
}


const {cTestFunc} = require('leetcode-zwischenzug')
const f = cTestFunc(matrixReshape)

f([[1,2],[3,4]],1,4)([[1,2,3,4]])
f([[1,2],[3,4]],2,4)([[1,2],[3,4]])
