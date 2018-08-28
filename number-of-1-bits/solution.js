/**
 * @param {number} n - a positive integer
 * @return {number}
 */
const hammingWeight = n => {
  let ans = 0
  while (n > 0) {
    if (n&1)
      ++ans
    // just want to say f u to the problem setter.
    n = Math.floor(n/2)
  }
  return ans
}
