/**
 * @param {number[]} nums
 * @return {number}
 */
const findLHS = nums => {
  const freqs = new Map()
  for (let i = 0; i < nums.length; ++i) {
    const num = nums[i]
    if (freqs.has(num)) {
      freqs.set(num, freqs.get(num)+1)
    } else {
      freqs.set(num, 1)
    }
  }
  const keys = [...nums.keys()].sort((a,b) => a-b)
  let ans = 0
  for (let i = 1; i < keys.length; ++i) {
    if (keys[i-1] + 1 === keys[i]) {
      const cur = freqs.get(i-1) + freqs.get(i)
      if (cur > ans)
        ans = cur
    }
  }

  return ans
}

const {cTestFunc} = require('leetcode-zwischenzug')
const f = cTestFunc(findLHS)
