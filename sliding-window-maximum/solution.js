/*

   idea:
   credit to fentoyal for the amazing explanation.

   https://leetcode.com/problems/sliding-window-maximum/discuss/65885/This-is-a-typical-monotonic-queue-problem

   my note:

   keep observation: given a window size K, some value will never show up in the result so we might
   as well in some sense ignore the actual values of them.

 */

function Monoqueue() {
  /*
     every element of xs is an Array of two values [val, count],
     which means there are `count` values (that we don't care) in front of `val`.

     `xs` is maintained so that the `val` part is always descending - which means
     the max value is always the first `val` in the Array
   */
  this.xs = []
  this.frontInd = 0
  this.size = 0
}

Monoqueue.prototype.push = function(val) {
  let {xs, frontInd, size} = this
  let count = 0
  while (size > 0) {
    const [x, cnt] = xs[frontInd+size-1]
    if (x < val) {
      // all `last value` less than `val` can be dropped and represented by
      // the count number
      count += cnt + 1
      --size
    } else {
      break
    }
  }
  xs[frontInd+size] = [val,count]
  ++size
  this.size = size
}

Monoqueue.prototype.pop = function() {
  const {xs, frontInd, size} = this
  if (xs[frontInd][1] > 0) {
    // when there are still elements in front
    --xs[frontInd][1]
  } else {
    ++this.frontInd
    --this.size
  }
}

Monoqueue.prototype.max = function() {
  const {xs, frontInd} = this
  return xs[frontInd][0]
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
f([1,3,-1,-3,5,3,6,7],3)([3,3,5,5,6,7])
