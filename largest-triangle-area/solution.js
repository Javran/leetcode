/**
 * @param {number[][]} points
 * @return {number}
 */
const largestTriangleArea = points => {
  // idea: use cross product
  let doubleArea = null
  const cur = new Array(3)
  const search = (dep,startInd) => {
    if (dep === 3) {
      // p1 - p0
      const [ax,ay] = [cur[1][0]-cur[0][0], cur[1][1]-cur[0][1]]
      // p2 - p1
      const [bx,by] = [cur[2][0]-cur[1][0], cur[2][1]-cur[1][1]]
      const result = Math.abs(ax*by - ay*bx)
      if (doubleArea === null || doubleArea < result)
        doubleArea = result
      return
    }
    for (let i = startInd; i < points.length; ++i) {
      cur[dep] = points[i]
      search(dep+1,startInd+1)
    }
  }
  search(0,0)
  return doubleArea/2
}

console.log(largestTriangleArea([[0,0],[0,1],[1,0],[0,2],[2,0]]))
