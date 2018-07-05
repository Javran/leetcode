/**
 * @param {number} m
 * @param {number} n
 * @param {number[][]} positions
 * @return {number[]}
 */
const numIslands2 = (m, n, positions) => {
  // disjoint set FTW
  const dSets = new Array(m)
  const ans = new Array(positions.length)
  for (let i = 0; i < m; ++i)
    dSets[i] = new Array(n).fill(null)
  const roots = new Set()

  const dsFind = x => {
    if (x.parent !== x)
      x.parent = dsFind(x.parent)
    return x.parent
  }

  const dsUnion = (x,y) => {
    let xRoot = dsFind(x)
    let yRoot = dsFind(y)
    if (xRoot === yRoot)
      return

    if (xRoot.size < yRoot.size) {
      const tmp = xRoot
      xRoot = yRoot
      yRoot = tmp
    }

    roots.delete(yRoot)
    yRoot.parent = xRoot
    xRoot.size += yRoot.size
  }

  positions.forEach(([row, col], ind) => {
    if (dSets[row][col] === null) {
      const s = {size: 1}
      s.parent = s
      dSets[row][col] = s
      roots.add(s)
      if (row-1 >= 0 && dSets[row-1][col])
        dsUnion(s, dSets[row-1][col])
      if (row+1 < m && dSets[row+1][col])
        dsUnion(s, dSets[row+1][col])
      if (col-1 >= 0 && dSets[row][col-1])
        dsUnion(s, dSets[row][col-1])
      if (col+1 < n && dSets[row][col+1])
        dsUnion(s, dSets[row][col+1])
    }
    ans[ind] = roots.size
  })
  return ans
}

console.log(numIslands2(3, 3, [[0,0], [0,1], [1,2], [2,1]]))
