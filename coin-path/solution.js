/**
 * @param {number[]} A
 * @param {number} B
 * @return {number[]}
 */
const cheapestJump = (xs, B) => {
  if (xs.length === 0)
    return []
  if (xs[0] === -1)
    return []
  if (xs.length === 1)
    return [1]
  // INVARIANT: xs.length >= 2 and xs[0] is reachable
  const N = xs.length
  const minCosts = new Int32Array(N).fill(-1)
  const froms = new Int16Array(N).fill(-1)
  xs.reverse()
  // using -2 to mark the beginning, as -1 has been used
  froms[0] = -2
  minCosts[0] = xs[0]
  for (let i = 0; i < N; ++i) {
    if (xs[i] === -1 || froms[i] === -1)
      continue
    const curCost = minCosts[i]
    for (let j = i+1; j <= i+B && j < N; ++j) {
      if (xs[j] === -1)
        continue
      const nextCost = curCost + xs[j]
      if (minCosts[j] === nextCost) {
        if (froms[j] < i)
          froms[j] = i
        continue
      }
      if (
        minCosts[j] === -1 ||
        minCosts[j] > nextCost
      ) {
        minCosts[j] = nextCost
        froms[j] = i
      }
    }
  }
  if (froms[N-1] === -1)
    return []
  const ans = []
  for (let i = N-1; i !== -2; i = froms[i])
    ans.push(N-i)
  return ans
}

console.log(cheapestJump([1,2,4,-1,2], 2))
console.log(cheapestJump([0,0,0,0,0,0], 3))
console.log(cheapestJump([0,-1,-1,-1,0,0], 3))
