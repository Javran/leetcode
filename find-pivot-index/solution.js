/**
 * @param {number[]} nums
 * @return {number}
 */
const pivotIndex = nums => {
  const N = nums.length
  if (N === 0) {
    return -1
  }
  if (N === 1) {
    return 0
  }
  /*
     idea: to find the pivot index we need a way to efficiently
     find partial sums starting from 0 to i and from i to the end,
     in which i could be any valid index.
     and we do this by usiny acc[i] for left partial sums,
     together with the total sum, we should be able to figure out right partial sums.
     the remaining part is just scan through all `i`s and and find first one
     that meets the requirement
   */
  // acc[i] = nums[0] + nums[1] + ... + nums[i]
  const acc = new Int32Array(N)
  acc[0] = nums[0]
  for (let i = 1; i < N; ++i)
    acc[i] = acc[i-1] + nums[i]
  const total = acc[N-1]
  for (let i = 0; i < N; ++i) {
    const leftSum = acc[i] - nums[i]
    const rightSum = total - acc[i]
    if (leftSum === rightSum)
      return i
  }
  return -1
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(pivotIndex)
f([1,7,3,6,5,6])(3)
f([])(-1)
f([-1000])(0)
f([1,2,3,4,-10,6])(5)
f([600,1,2,3,4,-10])(0)
