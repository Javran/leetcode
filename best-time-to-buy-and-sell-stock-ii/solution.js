/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = ps => {
  /*
     idea: one interesting property that we can use, the following two gives us same profit:

     - buy at day i, sell at day j, buy at same day (j), then sell at day k
     - buy at day i, sell at day k

     in other words: (p[k] - p[j]) + (p[j] - p[i]) === p[k] - p[i].

     so instead of finding all consecutive ranges where we can produce some profit,
     we just look for neighboring pairs p[i-1] and p[i] and collect the profit.

   */
  let acc = 0
  for (let i = 1; i < ps.length; ++i) {
    if (ps[i] > ps[i-1])
      acc += ps[i] - ps[i-1]
  }
  return acc
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(maxProfit)
f([7,1,5,3,6,4])(7)
f([7,6,4,3,1])(0)
f([5,3,1,2,9,3,2,1,0])(8)
f([1,2,3,4,5])(4)
