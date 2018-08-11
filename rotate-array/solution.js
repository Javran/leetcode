const gcd = (a,b) => {
  if (b === 0)
    return a
  return gcd(b, a%b)
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const rotate = (nums, k) => {
  const N = nums.length
  if (N <= 1)
    return
  k = k % N
  // our approach results in rotating to left, so we have to fix this
  // by turning k around.
  k = N - k
  if (k === 0)
    return
  /*
     idea: rotate by cycles.

     - if N and k are coprime, we can move element at index 0 to index k,
       then element at k to element at 2*k, ... until we go back to index 0
     - gcd(N,k) represents how many cycles are there, and we want to
       do this rotation for each individual cycle.
   */
  const cycles = gcd(N, k)
  for (let c = 0; c < cycles; ++c) {
    // c is the starting point
    for (
      let i = c, j = (c+k) % N;
      j !== c;
      i = j, j = (j+k) % N
    ) {
      const tmp = nums[j]
      nums[j] = nums[i]
      nums[i] = tmp
    }
  }
  return
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(function rotateTest(xs, k) {
  rotate(xs, k)
  return xs
})

f([1,2,3,4,5,6,7],3)([5,6,7,1,2,3,4])
f([-1,-100,3,99],2)([3,99,-1,-100])
f([1,2,3,4,5],6)([5,1,2,3,4])
f([1,2,3,4,5,6,7,8,9],3)([7,8,9,1,2,3,4,5,6])
