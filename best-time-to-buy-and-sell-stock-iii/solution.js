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
const maxProfit = ps => {
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
       but note that we intentionally allow i === j to indicate
       the fact that we can buy and sell stock at the same day once or twice.
       (as long as N >= 1 to allow this operation to happen)
       we want to do this so we don't force ourselves into doing negative profits
       (e.g. ps = [4,3,2,1])


   */
  for (let k = 1; k <= 2; ++k) {
    for (let i = 1; i < N; ++i) {
      let max = f[i-1][k]
      for (let j = 0; j <= i ; ++j) {
        let cur = f[j][k-1] + ps[i] - ps[j]
        if (cur > max)
          max = cur
      }
      f[i][k] = max
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
