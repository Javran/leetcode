/**
 * @param {number[]} nums
 * @return {number}
 */
const maximumProduct = nums => {
  /*
     idea: some analysis will reveal that
     the maximum product can only be one of:
     - product of 3 maximum numbers of array
     - 1 maximum number and 2 minimum number of the array.
   */
  const N = nums.length
  // sorting is definiely an overkill as we just need few numbers
  // from beginning and end of nums.
  // so here we just perform 3+2 = 5 iterations of bubble sort.
  for (let i = 0; i < 3; ++i) {
    for (let j = 1; j < N - i; ++j) {
      if (nums[j-1] > nums[j]) {
        const tmp = nums[j]
        nums[j] = nums[j-1]
        nums[j-1] = tmp
      }
    }
  }
  // now last 3 nums are sorted.
  for (let i = 0; i < 2; ++i) {
    for (let j = N-4; j > i; --j) {
      if (nums[j-1] > nums[j]) {
        const tmp = nums[j]
        nums[j] = nums[j-1]
        nums[j-1] = tmp
      }
    }
  }
  // now first 2 are sorted
  const a = nums[0] * nums[1] * nums[N-1]
  const b = nums[N-3] * nums[N-2] * nums[N-1]
  return a >= b ? a : b
}

const {cTestFunc} = require('leetcode-zwischenzug')
const f = cTestFunc(maximumProduct)

f([1,2,3])(6)
f([1,2,3,4])(24)
f([-9,-8,-1,0])(0)
f([-9,-8,-1,0,3,4])(4*9*8)
f([-9,-8,-1,0,3,20,20])(1440)
