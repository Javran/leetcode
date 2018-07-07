/**
 * @param {number[]} stones
 * @return {boolean}
 */
const canCross = stones => {
  // NB: stones.length >= 2
  if (stones[1] - stones[0] !== 1)
    // not possible to make the first jump
    return false
  const froms = new Array(stones.length)
  // ind 1 can only be reached from ind 0
  froms[1] = new Set([0])
  for (let i = 1; i+1 < stones.length; ++i) {
    if (!(i in froms))
      continue
    const curPos = stones[i]
    froms[i].forEach(fromInd => {
      const fromPos = stones[fromInd]
      const k = curPos - fromPos
      for (let jumpDist = k-1; jumpDist <= k+1; ++jumpDist) {
        if (jumpDist >= 1) {
          const nextPos = curPos + jumpDist
          let j = i+1
          while (j < stones.length && stones[j] < nextPos)
            ++j
          if (stones[j] === nextPos) {
            if (j in froms) {
              froms[j].add(i)
            } else {
              froms[j] = new Set([i])
            }
          }
        }
      }
    })
  }

  return ((stones.length-1) in froms)
}

console.log(canCross([0,1,3,5,6,8,12,17]))
