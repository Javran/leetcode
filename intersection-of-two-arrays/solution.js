/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
const intersection = (nums1, nums2) => {
  // idea: straightforward approach using Set
  const set1 = new Set(nums1)
  const outSet = new Set()
  for (let i = 0; i < nums2.length; ++i) {
    const v = nums2[i]
    if (set1.has(v)) {
      outSet.add(v)
    }
  }
  return [...outSet.values()]
}

const {cTestFunc} = require('leetcode-zwischenzug')
const f = cTestFunc(intersection)

f([1,2,2,1],[2,2])([2])
f([4,9,5],[9,4,9,8,4])([9,4])
