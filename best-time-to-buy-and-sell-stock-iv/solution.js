// details in my best-time-to-buy-and-sell-stock-iii solution.
const maxProfit = (K, ps) => {
  const N = ps.length
  if (N === 0)
    return 0
  if (K >= (N >>> 1)) {
    // when we have more than enough limit on transactions,
    // we can just do "best-time-to-buy-and-sell-stock-ii"-thing
    let ans = 0
    for (let i = 1; i < N; ++i) {
      if (ps[i] > ps[i-1])
        ans += ps[i] - ps[i-1]
    }
    return ans
  }
  const f = new Array(N)
  for (let i = 0; i < N; ++i)
    f[i] = new Uint32Array(K+1)
  for (let k = 1; k <= K; ++k) {
    let max = f[0][k-1] - ps[0]
    for (let i = 1; i < N; ++i) {
      f[i][k] = Math.max(f[i-1][k], ps[i] + max)
      max = Math.max(max, f[i][k-1] - ps[i])
    }
  }
  return f[N-1][K]
}

const {consoleTest, genList} = require('leetcode-zwischenzug')
const f = consoleTest(maxProfit)
f(2,[2,4,1])(2)
f(2,[3,2,6,5,0,3])(7)
f(
  12,
  [-3,-7,-10,13,18,0,7,-9,16,3,-6,6,0,12,19,20,0,17,2,15,-8,2,2,5,11,14,12,-10,-5,20,2,3,18,11,3,15,9,4,-1,-5,-3,13,19,1,7,17,13,10,3,1,16,-8,11,1,17,-3,16,5,0,1,-4,2,20,-4,12,7,12,-5,-10,20,17,0,19,20,5,17,19,-7,-3,20,20,-8,1,20,-3,18,7,7,12,9,16,4,6,11,2,-8,12,15,3,-2]
)(312)
f(200000000,[3,2,6,5,0,3])(7)
