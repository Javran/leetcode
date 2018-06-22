/**
 * @param {number[][]} points
 * @return {boolean}
 */
const isConvex = points => {
  // https://en.wikipedia.org/wiki/Cross_product
  // we'll be using sign of cross product of neighborhood vectors
  // to tell the direction
  const crossSign = (pa, pb, pc) => {
    // vector pa -> pb cross pb -> pc
    const ax = pb[0] - pa[0]
    const ay = pb[1] - pa[1]
    const bx = pc[0] - pb[0]
    const by = pc[1] - pb[1]
    return Math.sign(ax*by - ay*bx)
  }
  const l = points.length
  // sign === 0: not yet decided because the two vector in question
  // shares the same line and direction
  let sign = crossSign(points[0], points[1], points[2])
  const testSign = (i,j,k) => {
    const curSign = crossSign(points[i], points[j], points[k])
    // try fixing sign to either -1 or 1
    if (sign === 0) {
      if (curSign !== 0)
        sign = curSign
      return true
    }
    // straight line won't matter.
    if (curSign === 0)
      return true
    // if sign is not zero and either does curSign
    // we look for consistency
    return curSign === sign
  }

  for (let i = 3; i < l; ++i) {
    if (!testSign(i-2, i-1, i))
      return false
  }

  if (!testSign(l-2, l-1, 0))
    return false

  if (!testSign(l-1, 0, 1))
    return false

  return true
}
