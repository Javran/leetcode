/**
 * @param {number[][]} costs
 * @return {number}
 */
const minCost = costs => {
  if (costs.length === 0)
    return 0
  const f = new Int32Array(3)
  for (let i = 0; i < 3; ++i)
    f[i] = costs[0][i]
  for (let i = 1; i < costs.length; ++i) {
    // f[?] is the minimum cost when painting with color ? at current position (i-1)
    const cost = costs[i]
    const f0 = Math.min(f[1], f[2]) + cost[0]
    const f1 = Math.min(f[0], f[2]) + cost[1]
    const f2 = Math.min(f[0], f[1]) + cost[2]
    // update so that f reflects situation at position i
    f[0] = f0, f[1] = f1, f[2] = f2
  }
  return Math.min(f[0], f[1], f[2])
}

console.log(minCost([[17,2,17],[16,16,5],[14,3,19]]))
