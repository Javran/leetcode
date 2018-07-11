const {sortedIndex} = require('underscore')

const solveMaxSum1D = (xs, k) => {
  // guaranteed: k > 0
  let max = -Infinity
  /*
     let accSum[i] be sum of xs[0], xs[1], ..., xs[i-1]
     and specially accSum[0] = 0,
     so we can compute sum of any non-empty region xs[i], xs[i+1], .. xs[j]
     with accSum[j+1] - accSum[i]
   */
  const accSum = new Array(xs.length+1)
  accSum[0] = 0
  for (let i = 0; i < xs.length; ++i) {
    accSum[i+1] = accSum[i] + xs[i]
  }
  const tmp = []
  const insert = (index, val) => {
    const obj = {index, val}
    const ind = sortedIndex(tmp, obj, o => o.val)
    tmp.splice(ind, 0, obj)
  }
  for (let j = 0; j < xs.length; ++j) {
    /*
       xs[i] ... xs[j] = accSum[j+1] - accSum[i], where 0 <= i <= j
       we want accSum[j+1] - accSum[i] <= k

       therefore each accSum[j+1], we are looking for
       - accSum[j+1]-k <= accSum[i]
       - we want largest accSum[j+1] - accSum[i], which suggests minimizing accSum[i]

       strategy: find smallest accSum[i].
     */
    const K = accSum[j+1] - k
    insert(j, accSum[j])
    const resultInd = sortedIndex(tmp,{val: K}, o => o.val)
    if (resultInd === tmp.length)
      continue
    let i = tmp[resultInd].index
    if (i < tmp.length && K <= accSum[i]) {
      const nowMax = accSum[j+1]-accSum[i]
      if (max < nowMax) {
        max = nowMax
      }
    }
  }
  return max
}

/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
const maxSumSubmatrix = (mat, k) => {
  /*
     the matrix is at least of size 1x1
     otherwise there is no solution.
   */
  const rows = mat.length
  const cols = mat[0].length
  let max = -Infinity
  /*

     credits to java-chao

     first up, know how to deal with it in 1D array:
     ref: https://www.quora.com/Given-an-array-of-integers-A-and-an-integer-k-find-a-subarray-that-contains-the-largest-sum-subject-to-a-constraint-that-the-sum-is-less-than-k

     the idea is to build accumulative sums and find solution for every index j from 0 to some N-1.
     which can be solved in O(N*lg N)

     then time to see how to solve this in 2D: we basically
     project consecutive column regions into 1D array (using summation of course)
     and solve the problem over there.
     which results in overall time complexity of O(col*col*row*lg row).
     this works the best when row is longer than col.
     but if it is not the case, we still know how to do.
   */

  // now let's assume that the # of rows is larger than the # of cols,
  // so we want to enumerate col ranges and work on them as 1D array.
  const xs = new Int32Array(rows)
  for (let cL = 0; cL < cols; ++cL, xs.fill(0)) {
    for (let cR = cL; cR < cols; ++cR) {
      // accumulate new col
      for (let i = 0; i < rows; ++i)
        xs[i] += mat[i][cR]
      const curMax = solveMaxSum1D(xs, k)
      if (max < curMax)
        max = curMax
    }
  }
  return max
}

console.assert(
  maxSumSubmatrix(
    [
      [1, 0, 1],
      [0, -2, 3],
    ],
    2
  ) == 2
)

const genTest = () => {
  const {randomIntGenBetween} = require('leetcode-zwischenzug')
  const g = randomIntGenBetween(-10, 10)
  const mat = new Array(10)
  for (let i = 0; i < 10; ++i) {
    mat[i] = []
    for (let j = 0; j < 4; ++j)
      mat[i].push(g())
  }
  console.log(JSON.stringify(mat))
}

const mat = [[-3,2,-7,-10],[-6,-5,7,7],[8,-1,-10,-10],[-2,-4,6,9],[6,2,-9,-10],[-5,-6,-8,-1],[-5,1,-5,-10],[-8,7,2,0],[7,4,-5,1],[-7,9,-10,0]]
console.assert(maxSumSubmatrix(mat, 1000) === 21)
console.assert(maxSumSubmatrix(mat, 0) === 0)
console.assert(maxSumSubmatrix(mat, -5) === -5)
console.assert(maxSumSubmatrix(mat, 16) === 15)
console.assert(maxSumSubmatrix(mat, 19) === 17)
console.assert(maxSumSubmatrix([[5,-4,-3,4],[-3,-4,4,5],[5,1,5,-4]], 0) === 0)
console.assert(maxSumSubmatrix(
  [
    [-9,-6,-1,-7,-6,-5,-4,-7,-6,0],
    [-4,-9,-4,-7,-7,-4,-4,-6,-6,-6],
    [-2,-2,-6,-7,-7,0,-1,-1,-8,-2],
    [-5,-3,-1,-6,-1,-1,-6,-3,-4,-8],
    [-4,-1,0,-8,0,-9,-8,-7,-2,-4],
    [0,-3,-1,-7,-2,-5,-5,-5,-8,-7],
    [-2,0,-8,-2,-9,-2,0,0,-9,-6],
    [-3,-4,-3,-7,-2,-1,-9,-5,-7,-2],
    [-8,-3,-2,-8,-9,0,-7,-8,-9,-3],
    [-7,-4,-3,-3,-3,-1,0,-1,-8,-2]
  ], -321) === -323)
