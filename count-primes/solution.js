/**
 * @param {number} n
 * @return {number}
 */
const countPrimes = n => {
  // note that it's *less than*.
  if (n <= 2)
    return 0
  const ps = new Uint8Array(n).fill(1)
  let ans = 0
  for (let p = 2; p < n; ++p) {
    if (ps[p] !== 0) {
      ++ans
      for (let j = p+p; j < n; j += p)
        ps[j] = 0
    }
  }
  return ans
}
