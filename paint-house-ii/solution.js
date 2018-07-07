/**
 * @param {number[][]} costs
 * @return {number}
 */
const minCostII = costs => {
  if (costs.length === 0)
    return 0
  const N = costs[0].length
  /*

     2-D dynamic programming:

     f[i][c] for cost of painting houses from 0 to i, with i-th house painted color c.

     f[i][c] = min(f[i-1][c1]) + cost[i][c] where c1 != c

     note that f[i][?] is derived from just f[i-1][?] and cost[i][?],
     we can do a left-fold to figure out the result.

   */
  const combine = (xs, ys) => {
    // try to figure out min value and 2nd smallest num
    // INVARIANT: min1 <= min2
    let min1 = null, min2 = null
    let minInd1, minInd2
    for (let i = 0; i < N; ++i) {
      if (min1 === null || xs[i] <= min1) {
        if (min2 === null || min1 <= min2) {
          // try updating 2nd with min1 (which is being replaced by xs[i])
          min2 = min1
          minInd2 = minInd1
        }
        min1 = xs[i]
        minInd1 = i
      } else if (min2 === null || xs[i] <= min2) {
        // or when xs[i] does not update min1 but
        // can still update min2
        min2 = xs[i]
        minInd2 = i
      }
    }
    for (let i = 0; i < N; ++i) {
      if (i !== minInd1) {
        ys[i] += min1
      } else {
        ys[i] += min2
      }
    }
    return ys
  }
  return Math.min.apply(null, costs.reduce(combine))
}

console.log(minCostII([[1,5,3],[2,9,4]]))
