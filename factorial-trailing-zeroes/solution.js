/**
 * @param {number} n
 * @return {number}
 */
const trailingZeroes = n => {
  /*
     idea: counting trailing zeros is actually just figuring out
     how many 10s can we find from factors of n.
     we do this by count how many 5s are there - this is because the only
     way to create a 10 is by 2*5, and since we always have more than sufficient
     2s floating around, we only need to worry about 5s.
     - so for the first step we'll count products of 5s.
     - but there are numbers that have more than one factor of 5, for example 25.
       in this case we'll recursively solve the problem for (n/5) and do the same counting again.
     - for the rounding method, we'll be using floor as we don't want to count things that aren't in range.
   */
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
