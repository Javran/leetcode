/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
const reverseBits = n => {
  let ans = new Uint32Array(1)
  for (let i = 0; i < 32; ++i) {
    ans[0] <<= 1
    ans[0] |= n & 1
    n >>= 1
  }
  return ans[0]
}

console.log(reverseBits(2147483648))
