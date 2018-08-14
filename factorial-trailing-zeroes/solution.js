/**
 * @param {number} n
 * @return {number}
 */
const trailingZeroes = n => {
  let ans = 0
  while (n >= 5) {
    const t = Math.floor(n / 5)
    ans += t
    n = t
  }
  return ans
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(trailingZeroes)
f(3)(0)
f(5)(1)
f(25)(6)
f(323132)(80780)
