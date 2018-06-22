/**
 * @param {number[][]} points
 * @return {boolean}
 */
const isConvex = points => {
  const crossSign = (pa, pb, pc) => {
    // vector pa -> pb cross pb -> pc
    const ax = pb[0] - pa[0]
    const ay = pb[1] - pa[1]
    const bx = pc[0] - pb[0]
    const by = pc[1] - pb[1]
    return Math.sign(ax*by - ay*bx)
  }
  const l = points.length
  let sign = crossSign(points[0], points[1], points[2])
  const testSign = (i,j,k) => {
    const curSign = crossSign(points[i], points[j], points[k])
    if (sign === 0) {
      if (curSign !== 0)
        sign = curSign
      return true
    }
    if (curSign === 0)
      return true
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
