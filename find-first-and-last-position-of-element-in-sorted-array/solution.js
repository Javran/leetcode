/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const searchRange = (nums, target) => {
  if (nums.length === 0)
    return [-1,-1]

  /*
     idea: two binary searches with different directions of bias
   */
  const lMost = (() => {
    let l = 0, r = nums.length - 1
    while (l < r) {
      // left-biased mid-selection
      const mid = (l+r) >>> 1
      // right-biased pruning
      if (nums[mid] < target) {
        l = mid+1
      } else {
        r = mid
      }
    }
    return r
  })()

  if (nums[lMost] !== target)
    return [-1,-1]

  const rMost = (() => {
    // note that knowing lMost bound first
    // allows us to slightly improve our algorithm
    // by reducing search space to [lMost .. length-1]
    // no difference in terms of complexity class as it's still O(lg n)
    // but this could save us some unnecessary iterations
    let l = lMost, r = nums.length - 1
    while (l < r) {
      // right-biased mid-selection
      const mid = (l+r+1) >>> 1
      // left-biased pruning
      if (nums[mid] <= target) {
        l = mid
      } else {
        r = mid-1
      }
    }
    return l
  })()

  return [lMost, rMost]
}

const {cTestFunc} = require('leetcode-zwischenzug')
const f = cTestFunc(searchRange)
const xs = [
  0,0,0,1,2, // last ind: 4
  2,2,2,3,3, // last ind: 9
  3,5,5,6,6, // last ind: 14
  6,6,6,6,7, // last ind: 19
]

f(xs, -10)([-1,-1])
f(xs, 100)([-1,-1])
f(xs, 0)([0,2])
f(xs, 1)([3,3])
f(xs, 2)([4,7])
f(xs, 3)([8,10])
f(xs, 4)([-1,-1])
f(xs, 5)([11,12])
f(xs, 6)([13,18])
f(xs, 7)([19,19])
