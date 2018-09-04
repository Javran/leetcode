const eps = 1e-5

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const findMaxAverage = (nums, k) => {
  const N = nums.length
  const accSum = new Int32Array(N+1)
  let lVal = nums[0], rVal = nums[0]
  for (let i = 0; i < N; ++i) {
    accSum[i+1] = accSum[i] + nums[i]
    if (lVal > nums[i])
      lVal = nums[i]
    if (rVal < nums[i])
      rVal = nums[i]
  }
  // now that accSum[j+1] - accSum[i] gives nums[i] + nums[i+1] + ... + nums[j]
  const check = guess => {
    // sum from 0 to k-1
    let sum = accSum[k] - accSum[0] - guess*k
    if (sum >= 0)
      return true
    let prev = 0, minSum = 0
    for (let i = k; i < N; ++i) {
      sum += nums[i] - guess
      prev += nums[i-k] - guess
      if (minSum > prev)
        minSum = prev
      if (sum >= minSum)
        return true
    }
    return false
  }

  while (true) {
    const mid = (lVal + rVal) / 2
    if (rVal - lVal >= eps) {
      if (check(mid)) {
        lVal = mid
      } else {
        rVal = mid
      }
    } else {
      return mid
    }
  }
}

const assert = require('assert')
const {cTestFunc, genList} = require('leetcode-zwischenzug')
const f = cTestFunc(findMaxAverage, (a,e) => assert(Math.abs(a-e) < eps))
f([1,12,-5,-6,50,3], 4)(12.75)
// console.log(JSON.stringify(genList(100,{l:-10000, r:10000})))
f(
  [-9787,-3622,5438,4583,5290,-7531,-7741,-5258,4870,9248,7385,-6601,1875,5952,-7295,2079,-1138,-2791,-422,9971,-9824,-5822,3532,-8947,-8263,8674,-3044,9501,2755,716,-5344,-4024,-9609,-7483,3980,5614,-6040,-3351,9453,6198,-1643,-1559,8106,-2343,7786,-5314,-4278,1480,5397,-2015,2585,-8858,-2575,3837,327,28,7287,431,7607,-6381,-4235,-3920,1157,5465,-8542,-9580,7554,1518,6904,-8162,-728,1856,-2030,-1708,4849,-840,-6817,5243,-5600,9587,-1068,-6845,2362,-4052,2859,-5954,1207,-4943,-2498,3940,-8574,9077,-2653,-2165,2494,9484,-3708,623,200,-1394],
  5
)(4111)
