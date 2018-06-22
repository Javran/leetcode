const cmp = (x,y) => x - y
/**
 * @param {number[]} houses
 * @param {number[]} heaters
 * @return {number}
 */
const findRadius = (hs, es) => {
  // note that we can assume that es is always non-empty,
  // because the problem does not specify what if no heater provided

  if (hs.length === 0)
    return 0

  hs.sort(cmp)
  es.sort(cmp)

  // idea: keep track of left side and right side (including current position for
  // both sides), then min(ansL[x], ansR[x]) should be the radius for house x
  // to be heated
  const ansL = new Array(hs.length)
  const ansR = new Array(hs.length)
  // scan from left to figure out ansL
  // eInd is always an valid element index
  for (let i = 0, eInd = 0; i < hs.length; ++i) {
    const h = hs[i]
    if (es[eInd] <= h) {
      while (eInd+1 < es.length && es[eInd+1] <= h)
        ++eInd
      ansL[i] = h - es[eInd]
    } else {
      ansL[i] = null
    }
  }
  // symmetric for ansR
  for (let i = hs.length-1, eInd = es.length-1; i >= 0; --i) {
    const h = hs[i]
    if (es[eInd] >= h) {
      while (eInd-1 >= 0 && es[eInd-1] >= h)
        --eInd
      ansR[i] = es[eInd] - h
    } else {
      ansR[i] = null
    }
  }

  let max = null
  for (let i = 0; i < hs.length; ++i) {
    const l = ansL[i], r = ansR[i]
    // l and r cannot be both empty
    // otherwise es will be empty.
    const ans =
      l === null ? r :
      r === null ? l :
      Math.min(l,r)
    if (max === null || ans > max)
      max = ans
  }
  return max
}

console.assert(findRadius([0,1,2,5,6,9],[3,7]) === 3)
console.assert(findRadius([],[3,7]) === 0)
console.assert(findRadius([1,2,3],[2]) === 1)
console.assert(findRadius([1,2,3,4],[1,4]) === 1)
