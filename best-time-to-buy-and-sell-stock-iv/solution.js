// details in my best-time-to-buy-and-sell-stock-iii solution.
const maxProfit = (K, ps) => {
  const N = ps.length
  if (N <= 1)
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
  /*
     optimize 1: we swap two dimensions here so that
     we have less amount of Arrays to initialize and handle.
     (at this point we know K < N/2)

     optimize 2: note that f[k][x] depends only on f[k-1][y]
     for some x,y. this suggests that we only need 2 arrays
     to carry out the computation.
   */
  const f = [new Uint32Array(N), new Uint32Array(N)]
  for (let k = 1; k <= K; ++k) {
    let kCur = k & 1, kPrev = 1 - kCur
    let max = f[kPrev][0] - ps[0]
    for (let i = 1; i < N; ++i) {
      f[kCur][i] = Math.max(f[kCur][i-1], ps[i] + max)
      max = Math.max(max, f[kPrev][i] - ps[i])
    }
  }
  return f[K & 1][N-1]
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
