/**
 * @param {number[]} nums
 * @return {number}
 */
const findLHS = nums => {
  /*
     idea: freq count and scan through keys in sorted order,
     and be aware that there are people trying too hard to be smart
   */
  if (nums.length <= 1)
    return 0

  const freqs = new Map()
  for (let i = 0; i < nums.length; ++i) {
    const num = nums[i]
    if (freqs.has(num)) {
      freqs.set(num, freqs.get(num)+1)
    } else {
      freqs.set(num, 1)
    }
  }
  const keys = [...freqs.keys()].sort((a,b) => a-b)
  let ans = 0
  for (let i = 1; i < keys.length; ++i) {
    if (keys[i-1] + 1 === keys[i]) {
      const cur = freqs.get(keys[i-1]) + freqs.get(keys[i])
      if (cur > ans)
        ans = cur
    }
  }

  return ans
}

const {cTestFunc} = require('leetcode-zwischenzug')
const f = cTestFunc(findLHS)

f([1,3,2,2,5,2,3,7])(5)
f([1,2])(2)
