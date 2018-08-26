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

  yRoot.parent = xRoot
  xRoot.size += yRoot.size
}

/**
 * @param {number[][]} grid
 * @param {number[][]} hits
 * @return {number[]}
 */
const hitBricks = (grid, hits) => {
  /*
     idea: kinda "you know how to do when you know how to do".
     instead of thinking about hitting blocks, do it backwards:
     add blocks to final setup, compute how many falling blocks are there
     by the difference of "top row" cluster.
   */
  const rows = grid.length
  const cols = grid[0].length
  const ans = new Array(hits.length)
  // construct grid after all hits are done
  const gridAfter = grid.map(row => row.slice())
  hits.forEach(([r,c]) => {
    gridAfter[r][c] = 0
  })
  const dSets = new Array(rows)
  // this node is for allow connecting top row cells together
  // which does not occupy any space by itself.
  const topRowDS = {size: 0}
  topRowDS.parent = topRowDS
  for (let i = 0; i < rows; ++i) {
    dSets[i] = new Array(cols)
    for (let j = 0; j < cols; ++j) {
      if (gridAfter[i][j] === 1) {
        const node = {size: 1}
        node.parent = node
        dSets[i][j] = node
        if (i === 0) {
          dsUnion(node, topRowDS)
        }
        if (i > 0 && dSets[i-1][j] !== null) {
          dsUnion(node, dSets[i-1][j])
        }
        if (j > 0 && dSets[i][j-1] !== null) {
          dsUnion(node, dSets[i][j-1])
        }
      } else {
        dSets[i][j] = null
      }
    }
  }

  for (let i = hits.length-1; i >= 0; --i) {
    const before = dsFind(topRowDS).size
    const [r,c] = hits[i]
    // since every coord will be hit only once, it's safe checking for this.
    if (grid[r][c] === 0) {
      ans[i] = 0
      continue
    }
    gridAfter[r][c] = 1
    const node = {size: 1}
    node.parent = node
    dSets[r][c] = node
    if (r === 0)
      dsUnion(node, topRowDS)
    if (r > 0 && dSets[r-1][c] !== null)
      dsUnion(node, dSets[r-1][c])
    if (r+1 < rows && dSets[r+1][c] !== null)
      dsUnion(node, dSets[r+1][c])
    if (c > 0 && dSets[r][c-1] !== null)
      dsUnion(node, dSets[r][c-1])
    if (c+1 < cols && dSets[r][c+1] !== null)
      dsUnion(node, dSets[r][c+1])
    const after = dsFind(topRowDS).size
    ans[i] = after === before ? 0 : after - before - 1
  }
  return ans
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(hitBricks)
f([[1,0,0,0],[1,1,1,0]],[[1,0]])([2])
f([[1,0,0,0],[1,1,0,0]],[[1,1],[1,0]])([0,0])
f(
  [
    [0,1,0,0,0,1,0,0,0,0],
    [0,1,0,0,0,1,0,0,0,0],
    [1,1,1,1,0,1,1,1,1,0],
    [0,1,0,0,0,1,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,1,0,0,0],
  ],
  [[2,2], [0,5], [4,4], [0,0], [0,1], [4,8]]
)([1,0,12,0,7,0])
