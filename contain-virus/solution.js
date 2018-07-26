const dsFind = x => {
  if (x.parent !== x)
    x.parent = dsFind(x.parent)
  return x.parent
}

// unionHook(u,v) to notify that u now becomes parent of v
const dsUnion = (x,y,unionHook) => {
  let xRoot = dsFind(x), yRoot = dsFind(y)
  if (xRoot === yRoot)
    return xRoot
  if (xRoot.rank < yRoot.rank) {
    const tmp = xRoot
    xRoot = yRoot
    yRoot = tmp
  }
  yRoot.parent = xRoot
  unionHook(xRoot, yRoot)
  if (xRoot.rank === yRoot.rank) {
      ++xRoot.rank
  }
  return xRoot
}

const dirs = [[-1,0],[1,0],[0,-1],[0,1]]

/**
 * @param {number[][]} grid
 * @return {number}
 */
const containVirus = grid => {
  /*
     idea: just do what's asked.
     here I decide to use disjoint-set
     for easy chunk detection
   */
  const rows = grid.length
  const cols = grid[0].length
  const emptyCells = new Set()
  const activeChunks = new Set()
  const dSets = new Array(rows)
  for (let i = 0; i < rows; ++i)
    dSets[i] = new Array(cols)
  /*
     coords encode: code = (i <<< 6) + j
     decode: i = code >>> 6, j = code & 0x3f
   */
  for (let i = 0; i < rows; ++i)
    for (let j = 0; j < cols; ++j) {
      if (grid[i][j] === 1) {
        const node = {rank: 0}
        node.parent = node
        dSets[i][j] = node
        activeChunks.add(node)
        const hook = (_u,v) => {
          activeChunks.delete(v)
        }
        if (i > 0 && grid[i-1][j] === 1) {
          dsUnion(dSets[i-1][j], node, hook)
        }
        if (j > 0 && grid[i][j-1] === 1) {
          dsUnion(dSets[i][j-1], node, hook)
        }
      } else {
        // g[i][j] === 0
        emptyCells.add((i << 6) + j)
      }
    }
  let ans = 0
  while (emptyCells.size > 0 && activeChunks.size > 0) {
    // step 1: count threats for each active chunk of infected cells
    const threatenCells = new Map()
    for (let ac of activeChunks) {
      threatenCells.set(ac, new Set())
    }
    // the trick is to look for empty cells and see if they are
    // threaten by any active chunks,
    // if so, we record current cell to threatenCells of the active chunks.
    emptyCells.forEach(code => {
      const x = code >>> 6
      const y = code & 0x3f
      dirs.forEach(([dx,dy]) => {
        const x1 = x + dx
        const y1 = y + dy
        if (x1 >= 0 && x1 < rows && y1 >= 0 && y1 < cols && grid[x1][y1] === 1) {
          const chunkRoot = dsFind(dSets[x1][y1])
          if (
            grid[x1][y1] === 1 &&
            threatenCells.has(chunkRoot)
          ) {
            /*
               we are using Set because the list is not guaranteed to be unique:
               if multiple cells of the same chunk threatens the same cell, (x,y) in this case,
               it can count towards the chunk multiple times.
             */
            threatenCells.get(chunkRoot).add(code)
          }
        }
      })
    })
    // step 2: select chunk of max threat
    let maxThreatChunk = null
    let maxThreatCells = null
    for (let [chunk, xs] of threatenCells) {
      if (maxThreatCells === null || maxThreatCells.size < xs.size) {
        maxThreatChunk = chunk
        maxThreatCells = xs
      }
    }
    // step 3: install walls
    activeChunks.delete(maxThreatChunk)
    // console.log(maxThreatCells)
    maxThreatCells.forEach(code => {
      const x = code >>> 6
      const y = code & 0x3f
      dirs.forEach(([dx,dy]) => {
        const x1 = x + dx
        const y1 = y + dy
         if (x1 >= 0 && x1 < rows && y1 >= 0 && y1 < cols && grid[x1][y1] === 1) {
           const chunkRoot = dsFind(dSets[x1][y1])
           if (
             chunkRoot === maxThreatChunk
           ) {
             // driving by empty cells allows us to count walls
             // without worrying about dups
             ++ans
           }
        }
      })
    })
    // step 4: spread
    // keeping a list because we don't want the update to happen immediately,
    // which could pre-maturely merge blocks and end up infecting more cells than actually needed.
    const todo = []
    emptyCells.forEach(code => {
      const x = code >>> 6
      const y = code & 0x3f
      dirs.forEach(([dx,dy]) => {
        const x1 = x + dx
        const y1 = y + dy
        if (x1 >= 0 && x1 < rows && y1 >= 0 && y1 < cols && grid[x1][y1] === 1) {
          const chunkRoot = dsFind(dSets[x1][y1])
          if (
            activeChunks.has(chunkRoot)
          ) {
            todo.push(code)
          }
        }
      })
    })
    todo.forEach(code => {
      const x = code >>> 6
      const y = code & 0x3f
      grid[x][y] = 1
      emptyCells.delete(code)
      const node = {rank: 0}
      node.parent = node
      dSets[x][y] = node
      activeChunks.add(node)
      const hook = (_u,v) => {
        activeChunks.delete(v)
      }

      dirs.forEach(([dx,dy]) => {
        const x1 = x + dx
        const y1 = y + dy
        if (x1 >= 0 && x1 < rows && y1 >= 0 && y1 < cols && grid[x1][y1] === 1) {
          // a bit twist here: inactive chunks cannot threat empty cells,
          // we only try to union with active chunks
          if (activeChunks.has(dsFind(dSets[x1][y1]))) {
            dsUnion(dSets[x1][y1], node, hook)
          }
        }
      })
    })
    // console.log(grid)
  }
  return ans
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(containVirus)
f([
  [0,1,0,0,0,0,0,1],
  [0,1,0,0,0,0,0,1],
  [0,0,0,0,0,0,0,1],
  [0,0,0,0,0,0,0,0]
])(10)
f([
  [1,1,1],
  [1,0,1],
  [1,1,1]
])(4)
f([
  [1,1,1,0,0,0,0,0,0],
  [1,0,1,0,1,1,1,1,1],
  [1,1,1,0,0,0,0,0,0]
])(13)
