/*
   my first idea is to just count all non-decreasing subarrays
   and take the maximum of two, this greedy approach doesn't work
   when it comes to [1,2,4,2,5,7,2,4,9,0],
   my greedy approach will group together [1,2,4](4-1=3), [2,5,7](7-2=5), [2,4,9](9-2=7), [0]
   and conclude that 5+7=12 is the answer,
   while [1,2,4,2,5,7](7-1=6),[2,4,9](9-2=7) gives 13.
   this approach doesn't work because we always prefer [1,2,4] and [2,5,7]
   over [1,2,4,2,5,7], as the former gives more profit,
   but we really wanna limit the # of transactions to 2, which is not taken
   into account.
 */

/**
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit_v1 = ps => {
  const N = ps.length
  if (N === 0)
    return 0
  const f = new Array(N)
  for (let i = 0; i < N; ++i)
    f[i] = new Array(3).fill(0)
  /*
     let f[i][k] represent max profit on i-th day for k completed transactions.

     f[i][k] = max of:

     - f[i-1][k], if we do nothing at i-th day

     - f[j][k-1] + ps[i] - ps[j] where 0 <= j <= i.

       NOTHING IS OBVIOUS ABOUT THIS CASE. so we'll have to explain this properly:
       this case is about if we sell stock at i-th day.
       note that nothing prevents us from buying and selling at the same day,
       this ends up producing 0 profit, but doing so allows us to
       worry about performing exactly k transactions instead of at most k transactions
       (as long as N >= 1 to allow this operation to happen)
       so we begin with allowing i === j to indicate that this operation is allowed,
       but actually we can have slightly better constrains:
       0 <= j < i with same recurrence relation also works.
       this is because f[i-1][k] is involved,
       which is at least 0 (as we have initialized it this way)
       we can interpret f[0][k] === 0 as performing this "buy and sell at the same day" business
       on first day, and we actually don't care that when this "empty operation" would happen.

   */
  for (let k = 1; k <= 2; ++k) {
    for (let i = 1; i < N; ++i) {
      let max = -Infinity
      for (let j = 0; j < i; ++j) {
        let cur = f[j][k-1] + ps[i] - ps[j]
        if (cur > max) {
          max = cur
        }
      }
      f[i][k] = Math.max(f[i-1][k], max)
    }
  }
  return f[N-1][2]
}

// credits to peterleetcode
// ref: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/discuss/39608/A-clean-DP-solution-which-generalizes-to-k-transactions
const maxProfit = ps => {
  const N = ps.length
  if (N === 0)
    return 0
  const f = new Array(N)
  for (let i = 0; i < N; ++i)
    f[i] = new Array(3).fill(0)
  for (let k = 1; k <= 2; ++k) {
    // also see graham2181's explanation below in that page for why this "max" business works.
    /*
       f[1][k] = max of
       - f[0][k]
       - f[0][k-1] + ps[1] - ps[0] => (f[0][k-1] - ps[0]) + ps[1]

       f[2][k] = max of
       - f[1][k]
       - f[1][k-1] + ps[2] - ps[1] => (f[1][k-1] - ps[1]) + ps[2]
       - f[0][k-1] + ps[2] - ps[0] => (f[0][k-1] - ps[0]) + ps[1]

       f[3][k] = max of
       - f[2][k]
       - f[2][k-1] + ps[3] - ps[2] => (f[2][k-1] - ps[2]) + ps[3]
       - f[1][k-1] + ps[3] - ps[1] => (f[1][k-1] - ps[1]) + ps[2]
       - f[0][k-1] + ps[3] - ps[0] => (f[0][k-1] - ps[0]) + ps[1]

       ...

       note that how things are repeated
       so we can keep track of max = f[j][k-1] - ps[j] to
       reduce the amount of unnecessary computations
     */
    let max = f[0][k-1] - ps[0]
    for (let i = 1; i < N; ++i) {
      f[i][k] = Math.max(f[i-1][k], ps[i] + max)
      max = Math.max(max, f[i][k-1] - ps[i])
    }
  }
  return f[N-1][2]
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(maxProfit)
f([3,3,5,0,0,3,1,4])(6)
f([1,2,3,4,5])(4)
f([7,6,4,3,1])(0)
f([3,6,7,8,8,2,8])(11)
f([3,6,7,8,9,2,1,3,4])(9)
// a greedy approach would fail on this one
f([1,2,4,2,5,7,2,4,9,0])(13)
