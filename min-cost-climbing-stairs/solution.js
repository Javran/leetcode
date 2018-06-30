/**
 * @param {number[]} cost
 * @return {number}
 */
const minCostClimbingStairs = costs => {
  const f = new Array(costs.length)
  f[0] = costs[0]
  f[1] = costs[1]
  for (let i = 2; i < costs.length; ++i) {
    // should be straightforward: we either take one step or two steps at a time
    f[i] = costs[i] + (f[i-1] <= f[i-2] ? f[i-1] : f[i-2])
  }
  return Math.min(f[costs.length-1], f[costs.length-2])
}

console.log(minCostClimbingStairs([10, 15, 20]))
console.log(minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]))
