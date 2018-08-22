/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {string[]}
 */
const findMissingRanges = (nums, lower, upper) => {
  /*
     idea: keep track of first missing number as `fstMissing`,
     and we run through the list of numbers to either prove that:

     - current `fstMissing` is actually present, in which case we push `fstMissing` forward by 1
     - current `fstMissing` is indeed absent, in which case we record the missing range.

     in either cases `fstMissing` is moving forward without any stop until we have visited
     all numbers in the list, resulting in O(n) time complexity.
   */
  let fstMissing = lower
  const ans = []
  let i = 0
  const recordRange = (l,r) => {
    ans.push(
      l === r ? String(l) :
      `${l}->${r}`
    )
  }

  while (fstMissing <= upper) {
    while (i < nums.length && nums[i] < fstMissing)
      ++i
    if (i >= nums.length) {
      recordRange(fstMissing, upper)
      break
    }
    // nums[i] >= fstMissing
    if (nums[i] === fstMissing) {
      ++i
      ++fstMissing
    } else {
      recordRange(fstMissing, nums[i]-1)
      fstMissing = nums[i] + 1
    }
  }
  return ans
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(findMissingRanges)
f([0, 1, 3, 50, 75],0,99)(['2', '4->49', '51->74', '76->99'])
f([0, 2, 4, 6, 8],0,99)(['1', '3', '5', '7', '9->99'])
f([],0,10)(['0->10'])
f([2],3,10)(['3->10'])
f([2,9,10,20],3,14)(['3->8', '11->19'])
