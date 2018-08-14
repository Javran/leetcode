/**
 * @param {number[]} nums
 * @return {number}
 */
const maxSubArray = nums => {
  // it should be the case that nums.length >= 1 otherwise we won't have a solution at all.
  let cur = nums[0]
  /*
     idea: for any valid index i in nums, let f[i] be
     maximum sum of subarray ending at i, therefore:

     f[i] = max of:

     - nums[i]
     - f[i-1] + nums[i]

     and we just need the max of f[i] for any i.

     note that f[i-1] + nums[i] > nums[i] ===> f[i-1] > 0

   */
  let max = cur
  for (let i = 1; i < nums.length; ++i) {
    if (cur > 0) {
      cur += nums[i]
    } else {
      cur = nums[i]
    }
    if (cur > max)
      max = cur
  }
  return max
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(maxSubArray)
f([-2])(-2)
f([2])(2)
f([-2,1,-3,4,-1,2,1,-5,4])(6)
