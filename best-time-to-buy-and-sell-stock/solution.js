/**
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit = ps => {
  /*
     idea: what we want is the maximum positive difference
     between a minimal value and some other value after that one.
     a linear scan allows us to do both at the same time

   */
  let min = +Infinity
  let max = 0
  for (let i = 0; i < ps.length; ++i) {
    const p = ps[i]
    if (min > p) {
      min = p
    } else {
      const cur = p - min
      if (max < cur)
        max = cur
    }
  }
  return max
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(maxProfit)
f([7,1,5,3,6,4])(5)
f([7,6,4,3,1])(0)
f([5,3,1,2,9,3,2,1,0])(8)
