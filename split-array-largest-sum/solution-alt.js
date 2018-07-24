/**
 * @param {number[]} nums
 * @param {number} m
 * @return {number}
 */
const splitArray = (nums, m) => {
  /*
     a faster approach than solution.js:
     we can use binary search to find the answer:
     instead of dynamic programming, we'll just guess the
     max sum and try to split array so that we have limited # of subarrays
     and still have sum under control.
   */
  const N = nums.length
  let l = -Infinity, r = 0
  for (let i = 0; i < N; ++i) {
    r += nums[i]
    if (l < nums[i])
     l = nums[i]
  }
  // try to see if we can use <= m subarrays and maintain max sum <= sumBound
  const experiment = sumBound => {
    let sum = 0
    let cnt = 0
    for (let i = 0; i < N && cnt <= m; ++i) {
      if (sum + nums[i] <= sumBound) {
        sum += nums[i]
      } else {
        if (nums[i] > sumBound)
          return false
        ++cnt
        sum = nums[i]
      }
    }
    ++cnt
    return cnt <= m
  }

  while (l < r) {
    const mid = (l + r) >>> 1
    if (experiment(mid)) {
      r = mid
    } else {
      l = mid+1
    }
  }
  return r
}

const {consoleTest, genList} = require('leetcode-zwischenzug')

consoleTest(splitArray)([1,2,3], 3)(3)
consoleTest(splitArray)([7,2,5,10,8], 2)(18)
consoleTest(splitArray)([874,184,1221,255,1744,654,1797,1705,1052,833], 2)(5387)
consoleTest(splitArray)([874,184,1221,255,1744,654,1797,1705,1052,833], 4)(3502)
consoleTest(splitArray)([874,184,1221,255,1744,654,1797,1705,1052,833], 9)(1797)
consoleTest(splitArray)([874,184,1221,255,1744,654,1797,1705,1052,833], 10)(1797)
