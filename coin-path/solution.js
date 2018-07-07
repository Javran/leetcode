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
  /*
     to problem setter: FUCK YOU.

     note that we are looking for "lexicographically smallest path"
     so if [1,2,3,4] and [1,6] are both valid, we should choose [1,2,3,4].

     my first attempt is to use the largest index possible to update "froms".
     this seems counter-intuitive, but it results in picking the shortest jump
     possible in order to make the result list longer.
     this approach can pass some tests, but not all of them - after all,
     making the shortest jump does not imply "lexicographically smallest path":
     [1,4,6,10] and [1,3,6,10] could all be valid solutions but [1,3,6,10] is
     the preferred answer while my approach will pick [1,4,6,10] simply because
     4 is larger.

     I accidentally discoverred that by simply reversing the input array,
     we can make the problem easier: by working backwards from end to beginning,
     we avoid the problem that some previous result might cut the result short.
     (for a working example, try with input `[0,0,0,0,0,0], 3` *credits to hguanyao*)
     also now picking the max index for "froms" actually makes sense:
     by always picking the farthest position (from left, or we should say from
     the actual right side), we guarantee "lexicographically smallest path".

   */
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
