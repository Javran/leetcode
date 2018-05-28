/**
 * @param {number[]} nums
 * @return {number}
 */
const findLengthOfLCIS = nums => {
  if (nums.length === 0)
    return 0

  let curLen = 1
  let maxLen = 1
  for (let i = 1; i < nums.length; ++i) {
    // we need consecutive sequence, which means curLen is allowed to increase
    // only when current number is strictly greater than the one right before it
    if (nums[i-1] < nums[i]) {
      curLen += 1
      if (maxLen < curLen)
        maxLen = curLen
    } else {
      curLen = 1
    }
  }

  return maxLen
}

console.log(findLengthOfLCIS([1,3,5,4,7]) === 3)
console.log(findLengthOfLCIS([1,2,3,1,2,5,6,5,5,1,2]) === 4)
console.log(findLengthOfLCIS([1,1,1,1]) === 1)
