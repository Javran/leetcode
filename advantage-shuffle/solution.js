const {sortedIndex} = require('underscore')

/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number[]}
 */
var advantageCount = (A, BInp) => {
  /*
     idea: go greedy: sort B in desc of value,
     and sort A in asc (to take advantage of `sortedIndex`).
     - if we can use a number in A to match B so that A[i] > B[i],
       use the smallest A satisfying the condition
     - otherwise, we cannot win no matter what, sacrifice minimum unused A
   */
  A.sort((x,y) => x-y)
  const B = BInp.map((val, ind) => ({val, ind}))
  const N = B.length
  const ans = new Array(N)
  B.sort((x,y) => y.val-x.val)
  B.forEach(({val, ind}) => {
    const indA = sortedIndex(A, val+1)
    if (indA < N && A[indA] > val) {
      ans[ind] = A[indA]
      A.splice(indA, 1)
    } else {
      ans[ind] = A.shift()
    }
  })
  return ans
}

console.log(advantageCount([12,24,8,32],[13,25,32,11]))
