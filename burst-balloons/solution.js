/**
 * @param {number[]} nums
 * @return {number}
 */
const maxCoins = nums => {
  // credit to dietpepsi.
  // ref: https://leetcode.com/problems/burst-balloons/discuss/76228/Share-some-analysis-and-explanations

  // basically the key is to think about the last, instead of the first balloon to burst
  // this removes the concern that the other part of the balloon might have an impact
  // on coins we could get.

  // DP is also possible, but I just feel it's more natural with memoized search
  const memo = new Array(nums.length+1)
  for (let i = 0; i <= nums.length; ++i)
    memo[i] = new Array(nums.length+1).fill(null)

  const getNum = i =>
    (i < 0 || i >= nums.length) ? 1 : nums[i]
  // solution for range (l,r)
  // namely nums[l..r-1]
  const search = (l, r) => {
    if (l === r)
      // nothing in range
      return 0
    if (l === r-1)
      // exactly one element in range
      return getNum(l-1)*nums[l]*getNum(l+1)
    if (memo[l][r] !== null)
      return memo[l][r]
    let ans = null
    for (let i = l; i < r; ++i) {
      // now nums[i] is the last balloon to burst in range (l,r)
      // (or element range [l..r-1]), it splits into problems of
      // bursting elements in range [l, i-1] and elements in range [i+1, r-1]
      const lResult = search(l, i)
      const rResult = search(i+1, r)
      const v = getNum(l-1)*nums[i]*getNum(r)
      const cur = lResult + rResult + v
      if (ans === null || ans < cur)
        ans = cur
    }
    memo[l][r] = ans
    return ans
  }
  return search(0, nums.length)
}

console.log(maxCoins([3,1,5,8]))
console.log(maxCoins([30,29,21,0,39,4,5,10,3,4,5,7,100]))
