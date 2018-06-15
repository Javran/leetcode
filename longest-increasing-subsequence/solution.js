/**
 * @param {number[]} nums
 * @return {number}
 */
const lengthOfLIS = nums => {
  // standard LIS.
  // dp[i] is the end element of sequence of length i+1.
  // we keep dp to be a increasing sequence
  // for every incoming number from nums,
  // we either make the length 1 element longer if it is greater than
  // any known ones, or replace an existing value to make the sequence conservative.
  // (or in other words, most likely to grow longer)
  const dp = new Array(nums.length)
  let curLen = 0
  for (let i = 0; i < nums.length; ++i) {
    const num = nums[i]
    if (curLen === 0 || dp[curLen-1] < num) {
      dp[curLen] = num
      ++curLen
    } else {
      // find ind s.t. dp[ind-1] < num <= dp[ind]
      // assume that dp[-1] = -inf
      let l = 0, r = curLen-1
      while (true) {
        const mid = (l+r) >> 1
        if (
          ((mid > 0 && dp[mid-1] < num) || mid === 0) &&
          num <= dp[mid]
        ) {
          dp[mid] = num
          break
        }
        if (num > dp[mid]) {
          l = mid+1
        } else {
          r = mid-1
        }
      }
    }
  }
  return curLen
}

console.log(lengthOfLIS([1,3,6,7,9,4,10,5,6]))
