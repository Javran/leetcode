function BinHeap(elemToKey) {
  this.size = 0
  this.container = []
  this.elemToKey = elemToKey
}

const siftUp = pq => ind => {
  const {container, elemToKey} = pq
  while (ind !== 0) {
    const parentInd = (ind - 1) >> 1
    if (elemToKey(container[parentInd]) > elemToKey(container[ind])) {
      const tmp = container[parentInd]
      container[parentInd] = container[ind]
      container[ind] = tmp
      ind = parentInd
    } else {
      break
    }
  }
}

const siftDown = pq => ind => {
  const {size, container, elemToKey} = pq
  while (true) {
    const lcInd = ind*2+1
    const rcInd = ind*2+2
    if (lcInd >= size)
      break
    let preferInd = ind
    if (
      elemToKey(container[lcInd]) <= elemToKey(container[preferInd])
    )
      preferInd = lcInd
    if (
      rcInd < size &&
      elemToKey(container[rcInd]) <= elemToKey(container[preferInd])
    )
      preferInd = rcInd

    if (preferInd !== ind) {
      const tmp = container[preferInd]
      container[preferInd] = container[ind]
      container[ind] = tmp
      ind = preferInd
    } else {
      break
    }
  }
}

BinHeap.prototype.insert = function(e) {
  const eInd = this.size
  this.container[this.size] = e
  ++this.size
  siftUp(this)(eInd)
}

BinHeap.prototype.extractMin = function() {
  if (this.size === 0)
    return null
  const ret = this.container[0]
  this.container[0] = this.container[this.size-1]
  --this.size
  siftDown(this)(0)
  return ret
}

/**
 * @param {number[][]} heightMap
 * @return {number}
 */
const trapRainWater = heights => {
  /*
     idea: surround the whole area and expand inwards until
     we have no more cell to scan. in this process,
     always prioritize on cell of lowest height.

     when we try to expand inwards from cell c0, we might encounter some cells c1
     whose height is less than current elevation.
     since we always expand inwards, the surroundings of c1 can at least hold water of height c0,
     a height less than elevation therefore means that c1 can hold water equal to the amount of difference.

   */
  // two rows or cols won't be able to hold any water.
  const rows = heights.length
  if (rows <= 2)
    return 0
  const cols = heights[0].length
  if (cols <= 2)
    return 0
  let ans = 0
  const pq = new BinHeap(e => e.h)
  const visited = new Array(rows)
  for (let i = 0; i < rows; ++i) {
    visited[i] = new Uint8Array(cols)
  }
  for (let i = 0; i < rows; ++i) {
    pq.insert({r: i, c: 0, h: heights[i][0]})
    visited[i][0] = 1
    pq.insert({r: i, c: cols-1, h: heights[i][cols-1]})
    visited[i][cols-1] = 1
  }
  for (let j = 1; j+1 < cols; ++j) {
    pq.insert({r: 0, c: j, h: heights[0][j]})
    visited[0][j] = 1
    pq.insert({r: rows-1, c: j, h: heights[rows-1][j]})
    visited[rows-1][j] = 1
  }
  while (pq.size > 0) {
    const {r,c,h} = pq.extractMin()
    const expand = (r1, c1) => {
      if (visited[r1][c1] === 0) {
        visited[r1][c1] = 1
        if (heights[r1][c1] < h) {
          ans += h - heights[r1][c1]
        }
        pq.insert({r: r1, c: c1, h: Math.max(heights[r1][c1], h)})
      }
    }
    if (r > 0) {
      expand(r-1,c)
    }
    if (r+1 < rows) {
      expand(r+1,c)
    }
    if (c > 0) {
      expand(r,c-1)
    }
    if (c+1 < cols) {
      expand(r,c+1)
    }
  }
  return ans
}

const {consoleTest, genList} = require('leetcode-zwischenzug')
const f = consoleTest(trapRainWater)
f([
  [1,4,3,1,3,2],
  [3,2,1,3,2,4],
  [2,3,3,2,3,1],
])(4)

const gen = () => {
  const xs = []
  for (let i = 0; i < 60; ++i) {
    xs[i] = genList(40, {l: 1, r: 19999})
  }
  console.log(JSON.stringify(xs))
}
// gen()
