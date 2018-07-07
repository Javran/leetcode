/**
 * @param {number} n
 * @return {number}
 */
const newInteger = n => {
  // well, removing all 9s is the same as turning a decimal number
  // into base-9 representation
  let ans = 0, base = 1
  while (n > 0) {
    ans += base*(n % 9)
    base *= 10
    n = Math.floor(n / 9)
  }
  return ans
}
