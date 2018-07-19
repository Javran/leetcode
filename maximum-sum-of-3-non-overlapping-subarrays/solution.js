/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
const maxSumOfThreeSubarrays = (nums, k) => {
  const N = nums.length
  // kSums[i] = sum from nums[i] to nums[i+k-1]
  let kSums = new Uint32Array(N-k+1)
  // first sum of first k nums
  for (let i = 0; i < k; ++i)
    kSums[0] += nums[i]
  for (let i = 1, j = i + k - 1; i < kSums.length; ++i, ++j) {
    kSums[i] = kSums[i-1] - nums[i-1] + nums[j]
  }
  // now problem becomes taking 3 values from kSums, but with some constraints
  // that all taken value should keep a distance from each other (index diff >= k)
  const f = new Array(3)
  const frm = new Array(3)
  f[1] = Array.from(kSums)
  frm[1] = new Array(kSums.length).fill(-1)
  // f[0] = new Int8Array(kSums.length)
  for (let i = 2; i <= 3; ++i) {
    f[i] = new Array(kSums.length).fill(-Infinity)
    frm[i] = new Array(kSums.length)
  }
  for (let t = 2; t <= 3; ++t) {
    for (let i = 0; i < kSums.length; ++i) {
      let max = -Infinity
      let frmInd = null
      for (let j = 0; i-j >= k; ++j) {
        if (f[t-1][j] > max) {
          max = f[t-1][j]
          frmInd = j
        }
      }
      f[t][i] = max + kSums[i]
      frm[t][i] = frmInd
    }
  }
  let max = -Infinity, maxInd = null
  for (let i = 0; i < kSums.length; ++i) {
    if (f[3][i] > max) {
      max = f[3][i]
      maxInd = i
    }
  }
  let t = 3
  const ans = []
  while (maxInd !== -1) {
    ans.push(maxInd)
    maxInd = frm[t][maxInd]
    --t
  }
  return ans.reverse()
}

console.log(maxSumOfThreeSubarrays([1,2,1,2,6,7,5,1], 2))

const {randomIntGenBetween} = require('leetcode-zwischenzug')
const genTest = (N = 20000) => {
  const g = randomIntGenBetween(1, 1 << 16)
  const xs = []
  for (let i = 0; i < N; ++i)
    xs.push(g())
  console.log(JSON.stringify(xs))
}

genTest()
