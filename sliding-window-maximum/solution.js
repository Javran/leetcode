/*

   idea:
   credit to fentoyal for the amazing explanation.

   https://leetcode.com/problems/sliding-window-maximum/discuss/65885/This-is-a-typical-monotonic-queue-problem

 */

function Monoqueue() {
  this.xs = []
}

Monoqueue.prototype.push = function(val) {
  const {xs} = this
  let count = 0
  while (xs.length > 0) {
    const [x, cnt] = xs[xs.length-1]
    if (x < val) {
      count += cnt + 1
      xs.pop()
    } else {
      break
    }
  }
  xs.push([val, count])
}

Monoqueue.prototype.pop = function() {
  const {xs} = this
  if (xs[0][1] > 0) {
    --xs[0][1]
  } else {
    xs.shift()
  }
}

Monoqueue.prototype.max = function() {
  return this.xs[0][0]
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
const maxSlidingWindow = (nums, k) => {
  const N = nums.length
  if (N < k)
    k = N
  const mq = new Monoqueue()
  const ans = []
  let i = 0
  for (/* NOOP */; i < k-1; ++i) {
    mq.push(nums[i])
  }
  for (/* NOOP */; i < N; ++i) {
    mq.push(nums[i])
    ans.push(mq.max())
    mq.pop()
  }
  return ans
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(maxSlidingWindow)
f([1,3,-1,-3,5,3,6,7], 3)()
