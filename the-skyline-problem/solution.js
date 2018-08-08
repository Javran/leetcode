function SegNode(l,r) {
  this.l = l
  this.r = r
  this.maxH = 0

  this.left = null
  this.right = null
}

const build = (xs, lInd, rInd) => {
  if (lInd > rInd)
    return null
  const ret = new SegNode(xs[lInd],xs[rInd])
  if (lInd === rInd)
    return ret
  const mid = (lInd+rInd) >>> 1
  ret.left = build(xs, lInd, mid)
  ret.right = build(xs, mid+1, rInd)
  return ret
}

const update = (root, l, r, h) => {
  /*
     INVARIANT:
     - root !== null
     - [l .. r] is always covered by [root.l .. root.r]
   */
  if (root.l === root.r) {
    root.maxH = Math.max(h, root.maxH)
    return
  }
  const lrBound = root.left.r
  const rlBound = root.right.l
  if (r <= lrBound) {
    update(root.left, l, r, h)
  } else if (rlBound <= l) {
    update(root.right, l, r, h)
  } else {
    update(root.left, l, lrBound, h)
    update(root.right, rlBound, r, h)
  }
  root.maxH = Math.max(root.left.maxH, root.right.maxH)
}

const query = (root, l, r) => {
  // similar assumption as `update`.
  if ((root.l === l && root.r === r) || root.l === root.r)
    return root.maxH

  const lrBound = root.left.r
  const rlBound = root.right.l
  if (r <= lrBound)
    return query(root.left, l, r)
  if (rlBound <= l)
    return query(root.right, l, r)
  const lResult = query(root.left, l, lrBound)
  const rResult = query(root.right, rlBound, r)
  return Math.max(lResult,rResult)
}

const ppr = root => {
  if (root === null)
    return '-'
  const pL = ppr(root.left)
  const pR = ppr(root.right)
  const desc = `l:${root.l},r:${root.r},h:${root.maxH}`
  return `{${pL} (${desc}) ${pR}}`
}

/**
 * @param {number[][]} buildings
 * @return {number[][]}
 */
const getSkyline = bs => {
  // TODO: slow for now
  const barSet = new Set()
  for (let i = 0; i < bs.length; ++i) {
    const [l,r,_h] = bs[i]
    barSet.add(l)
    barSet.add(r-1)
    // necessary because we are doing "bar"s rather than coordinates
    barSet.add(l-1)
    barSet.add(r)
  }
  const bars = [...barSet]
  bars.sort((x,y) => x-y)
  const root = build(bars, 0, bars.length-1)
  for (let i = 0; i < bs.length; ++i) {
    const [l,r,h] = bs[i]
    update(root,l,r-1,h)
  }
  // console.log(ppr(root))
  // console.log(bars)
  let ans = []
  for (let startInd = 0; startInd < bars.length; /* */) {
    const curH = query(root,bars[startInd],bars[startInd])
    // console.log(bars[startInd], curH)
    let endInd = startInd
    while (endInd+1 < bars.length) {
      const exH = query(root, bars[endInd+1], bars[endInd+1])
      if (exH !== curH)
        break
      ++endInd
    }
    if (curH > 0 || ans.length > 0)
      ans.push([bars[startInd], curH])
    startInd = endInd+1
  }
  return ans
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(getSkyline)
f([])([])
f([[1,2,3]])([[1,3],[2,0]])
f(
  [[2,9,10],[3,7,15],[5,12,12],[15,20,10],[19,24,8]]
)(
  [[2,10],[3,15],[7,12],[12,0],[15,10],[20,8],[24,0]]
)
