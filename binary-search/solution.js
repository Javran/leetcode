/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const search = (nums, target) => {
  /*
     idea: standard binary search, in which we can just set the search space (l,r)
     to be possible indices.
   */
  let l = 0
  let r = nums.length - 1
  while (l <= r) {
    const mid = (l + r) >>> 1
    if (nums[mid] === target) {
      return mid
    } else if (nums[mid] > target) {
      r = mid - 1
    } else {
      l = mid + 1
    }
  }
  return -1
}

const {cTestFunc} = require('leetcode-zwischenzug')
const f = cTestFunc(search)

f([-1,0,3,5,9,12], 9)(4)
f([-1,0,3,5,9,12], 2)(-1)
