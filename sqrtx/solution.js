/**
 * @param {number} x
 * @return {number}
 */
const mySqrt = x => {
  /*
     idea: I know there are faster ways,
     but the simplest one is binary search,
     which is nice, simple and easy to explain
   */
  // note that x is always a non-negative int
  if (x <= 1)
    // only 0 and 1 fit in this range
    return x
  let l = 1, r = x
  while (l < r) {
    // choose mid (right-biased)
    const mid = (l+r+1) >>> 1
    if (mid*mid <= x)
      // mid is safe to keep (left-biased)
      l = mid
    else
      r = mid-1
  }
  return l
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(mySqrt)

for (let i = 0; i < 1000; ++i) {
  const expected = Math.floor(Math.sqrt(i))
  f(i)(expected)
}
