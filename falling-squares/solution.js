function SegNode(lBound, rBound) {
  this.lBound = lBound
  this.rBound = rBound
  this.left = null
  this.right = null
  this.maxH = 0
}

const buildST = xs => {
  const buildAux = (lInd,rInd) => {
    if (lInd > rInd)
      return null
    const ret = new SegNode(xs[lInd], xs[rInd])
    if (lInd === rInd)
      return ret
    const mid = (lInd + rInd + 1) >>> 1
    ret.left = buildAux(lInd, mid-1)
    ret.right = buildAux(mid, rInd)
    return ret
  }
  return buildAux
}

const queryST = (st, l, r) => {
  if (l > r)
    return -Infinity
  if (st.lBound === l && st.rBound === r)
    return st.maxH
  const lrBound = st.left.rBound
  const rlBound = st.right.lBound
  if (r <= lrBound)
    return queryST(st.left, l, r)
  if (rlBound <= l)
    return queryST(st.right, l, r)

  return Math.max(
    queryST(st.left, l, lrBound),
    queryST(st.right, rlBound, r)
  )
}

const updateST = (st, l, r, newH) => {
  if (l > r)
    return
  if (st.maxH < newH)
    st.maxH = newH
  if (st.lBound === st.rBound)
    return
  const lrBound = st.left.rBound
  const rlBound = st.right.lBound
  if (r <= lrBound) {
    updateST(st.left, l, r, newH)
    return
  }
  if (rlBound <= l) {
    updateST(st.right, l, r, newH)
    return
  }
  updateST(st.left, l, lrBound, newH)
  updateST(st.right, rlBound, r, newH)
}

// for debugging.
const vis = st => {
  if (st === null) {
    return 'x'
  } else {
    const lStr = vis(st.left)
    const rStr = vis(st.right)
    return `(${lStr} [${st.lBound}-${st.rBound} H:${st.maxH}] ${rStr})`
  }
}

/**
 * @param {number[][]} positions
 * @return {number[]}
 */
const fallingSquares = ps => {
  const xCoordSet = new Set()
  ps.forEach(([lCoord, sz]) => {
    xCoordSet.add(lCoord)
    xCoordSet.add(lCoord+sz-1)
  })
  const xCoords = [...xCoordSet]
  xCoords.sort((x,y) => x-y)
  const st = buildST(xCoords)(0, xCoords.length-1)
  const ans = []
  ps.forEach(([lCoord, sz]) => {
    const rCoord = lCoord+sz-1
    const H = queryST(st, lCoord, rCoord)
    const newH = H + sz
    updateST(st, lCoord, rCoord, newH)
    ans.push(st.maxH)
  })
  return ans
}


const {genInt, consoleTest} = require('leetcode-zwischenzug')

const f = consoleTest(fallingSquares)
f([[1, 2], [2, 3], [6, 1]])([2,5,5])
f([[2,4],[9,5],[4,5],[8,5],[1,2],[4,9],[7,8],[2,10],[5,9],[1,7]])([4,5,9,14,14,23,31,41,50,57])

const genTest = () => {
  const sz = 1000
  const xs = new Array(sz)
  for (let i = 0; i < sz; ++i)
    xs[i] = [genInt(1,10 ** 8), genInt(1,10 ** 6)]
  return xs
}

// f(genTest())()
