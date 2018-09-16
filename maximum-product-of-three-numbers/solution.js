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
  nums.sort((x,y) => x-y)
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
