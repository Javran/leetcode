/**
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
const maxProfit = (prices, fee) => {
  // credit to Joy4fun for the solution. was overthinking on the O(n^2) approach.
  // ref: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/discuss/108871/2-solutions-2-states-DP-solutions-clear-explanation!
  const N = prices.length
  /*
     let buy[i] be the maximum profit on day i
     when last buy happens at day k (k <= i),
     and sell[i] be the maximum profit on day i
     when last sell happens at day k (k <= i),

     then we have:

     buy[i] = max of:

     - buy[i-1]
       if we do nothing
     - sell[i-1] + prices[i]
       if we sell previous stock some days earlier and buy new one on day i

     sell[i] = max of:

     - sell[i-1]
       if we do nothing
     - buy[i-1] + prices[i] - fee
       if we sell a previous stock on day i (with transaction fee being paid)

     this "do nothing" business allows us to take into account
     of the action of buying, holding for potentially few days and then selling.

   */
  const buy = new Array(N)
  const sell = new Array(N)
  buy[0] = -prices[0]
  sell[0] = 0
  for (let i = 1; i < N; ++i) {
    buy[i] = Math.max(buy[i-1], sell[i-1]-prices[i])
    sell[i] = Math.max(sell[i-1], buy[i-1]+prices[i]-fee)
  }
  return sell[N-1]
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(maxProfit)

f([1,2],0)(1)
f([1],20)(0)
f([1,2],20)(0)
f([1,3,2,8,4,9], 2)(8)
f([29,31,35,9,23,2,16,40,31,26],22)(16)
