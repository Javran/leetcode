/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const findMaxAverage = (xs, k) => {
  /*
     idea: a sliding window of sum
   */
  let curSum = 0
  for (let i = 0; i < k; ++i)
    curSum += xs[i]
  let curMax = curSum
  for (let i = k, j = 0; i < xs.length; ++i, ++j) {
    curSum = curSum - xs[j] + xs[i]
    if (curSum > curMax)
      curMax = curSum
  }
  return curMax / k
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(findMaxAverage)
f([1,12,-5,-6,50,3], 4)(12.75)
f([1,2],2)(3/2)
f([1,2,3,9],3)((2+3+9)/3)
