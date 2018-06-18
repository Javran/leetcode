const dsFindRoot = node => {
  if (node.parent === node)
    return node
  node.parent = dsFindRoot(node.parent)
  return node.parent
}

const dsUnion = (x,y) => {
  let xRoot = dsFindRoot(x)
  let yRoot = dsFindRoot(y)

  if (xRoot === yRoot)
    return xRoot

  if (xRoot.rank < yRoot.rank) {
    const tmp = xRoot
    xRoot = yRoot
    yRoot = tmp
  }

  yRoot.parent = xRoot
  if (xRoot.rank === yRoot.rank)
    xRoot.rank += 1
  return xRoot
}

/**
 * @param {character[][]} grid
 * @return {number}
 */
const numIslands = grid => {
  if (!Array.isArray(grid) || grid.length === 0)
    return 0
  if (grid[0].length === 0)
    return 0
  const rows = grid.length
  const cols = grid[0].length
  const disjoints = new Array(rows)
  for (let i = 0; i < rows; ++i) {
    const dRow = new Array(cols)
    for (let j = 0; j < cols; ++j) {
      if (grid[i][j] === '1') {
        const s = {rank: 0}
        s.parent = s
        dRow[j] = s
      } else {
        dRow[j] = null
      }
    }
    disjoints[i] = dRow
  }

  for (let i = 0; i < rows; ++i)
    for (let j = 0; j < cols; ++j)
      if (grid[i][j] === '1') {
        const cur = disjoints[i][j]
        if (j+1 < cols && grid[i][j+1] === '1') {
          dsUnion(cur, disjoints[i][j+1])
        }
        if (i+1 < rows && grid[i+1][j] === '1') {
          dsUnion(cur, disjoints[i+1][j])
        }
      }
  let ans = 0
  for (let i = 0; i < rows; ++i)
    for (let j = 0; j < cols; ++j) {
      const d = disjoints[i][j]
      if (d && d.parent === d)
        ++ans
    }
  return ans
}

console.log(
  numIslands(
    [
      [1,1,0,0,0],
      [1,1,0,0,0],
      [0,0,1,0,0],
      [0,0,0,1,1],
    ].map(xs => xs.map(String))
  )
)
