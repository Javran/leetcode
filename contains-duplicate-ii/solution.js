/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
const containsNearbyDuplicate = (nums, k) => {
  /*
     idea: do a sliding window:
     - if we have duplicates before even forming this window of size k,
       we definitely have nearby dups
     - otherwise slide the window until hitting the end.
   */
  if (k <= 0)
    return false
  const win = new Set()
  // expand window until it's size k
  for (let i = 0; i < k && i < nums.length; ++i) {
    const n = nums[i]
    if (win.has(n))
      return true
    win.add(n)
  }
  for (let i = k; i < nums.length; ++i) {
    const n = nums[i]
    if (win.has(n))
      return true
    win.delete(nums[i-k])
    win.add(n)
  }
  return false
}

const {cTestFunc} = require('leetcode-zwischenzug')
const f = cTestFunc(containsNearbyDuplicate)

f([1,2,3,1],3)(true)
f([1,0,1,1],1)(true)
f([1,2,3,1,2,3],2)(false)
f([2,12,11,1,2,3,11],3)(false)
f([2,12,11,1,2,3,11],4)(true)

/*
   apparanetly someone don't want to give a clear input range
   but want to penalize others based on that.
   well, usually we says those someones are dicks.
*/
f([1,0,1,1],0)(false)
