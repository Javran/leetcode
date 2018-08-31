/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const sortColors = nums => {
  let j = nums.length, u = 0
  /*
     idea: maintain 3 sorted groups while we scan through the Array.

     unless explicitly stated, all of below are range indices, whichs means
     they are pointing at element gaps rather than elements
     (e.g. range index 0 is to the left of first element, and range index 1 is to the right)

     - 0..u are all color 0s (element index from 0 to u-1)
     - u..i are all color 1s (element index from u to i-1)
     - j..N are all color 2s (element index from j to N-1)

     the algorithm runs in O(n). it's true that we don't always increase i,
     but when we don't, j is decreased instead making the range of
     unsorted part of the Array keeps shrinking.

   */
  for (let i = 0; i < j; /* NOOP */) {
    const num = nums[i]
    if (num === 0) {
      // could do: swap(u,i)
      // but we know that nums[i] = 0
      nums[i] = nums[u]
      nums[u] = 0
      ++u
      ++i
    } else if (num === 1) {
      ++i
    } else {
      --j
      // swap(j,i)
      // knowing nums[i] === 2
      nums[i] = nums[j]
      nums[j] = 2
    }
  }
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(function testSortColors(xs) {
  sortColors(xs)
  return xs
})

f([1,1,1,1,1,0,0,1,0,1])()
f([2,1,2,1,2,2])()
f([2,0,2,0,0,0,0,2,2])()
f([1,0,0,1,0,2,1,0])()
f([1,0,0,1,2,0,2,1,0])()
f([2,0,1,1,2,0,2,1])()
