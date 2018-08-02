const dsFind = s => {
  if (s.parent !== s) {
    s.parent = dsFind(s.parent)
  }
  return s.parent
}

const dsUnion = (x,y) => {
  let xRoot = dsFind(x), yRoot = dsFind(y)
  if (xRoot === yRoot)
    return
  if (xRoot.rank < yRoot.rank) {
    const tmp = xRoot
    xRoot = yRoot
    yRoot = tmp
  }
  yRoot.parent = xRoot
  if (xRoot.rank === yRoot.rank)
    ++xRoot.rank
}

/**
 * @param {number[][]} grid
 * @return {number}
 */
const swimInWater = grid => {
  /*
     idea: the problem can be simplified to be just asking
     for the first time that (0,0) and (N-1,N-1) are connected
     with each other, and disjoint set could do a good job of this.
   */
  const N = grid.length
  const T = N * N
  const rs = new Uint16Array(T)
  const cs = new Uint16Array(T)
  /*
     build up reverse lookup,
     as we know grid contains a permutation of [0..N*N-1],
     we might as well us this to our advantage.
   */
  for (let i = 0; i < N; ++i) {
    for (let j = 0; j < N; ++j) {
      const which = grid[i][j]
      rs[which] = i
      cs[which] = j
    }
  }
  const dSets = new Array(N)
  for (let i = 0; i < N; ++i) {
    dSets[i] = new Array(N)
    for (let j = 0; j < N; ++j) {
      const s = {rank: 0}
      s.parent = s
      dSets[i][j] = s
    }
  }
  for (let t = 0; t < T; ++t) {
    // try expanding to lower elevations
    const i = rs[t], j = cs[t]
    const nowSet = dSets[i][j]
    if (i > 0 && grid[i-1][j] <= t) {
      dsUnion(nowSet, dSets[i-1][j])
    }
    if (i+1 < N && grid[i+1][j] <= t) {
      dsUnion(nowSet, dSets[i+1][j])
    }
    if (j > 0 && grid[i][j-1] <= t) {
      dsUnion(nowSet, dSets[i][j-1])
    }
    if (j+1 < N && grid[i][j+1] <= t) {
      dsUnion(nowSet, dSets[i][j+1])
    }

    if (dsFind(dSets[0][0]) === dsFind(dSets[N-1][N-1]))
      return t
  }
  // this part is actually unreachable.
  return T
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(swimInWater)
f([[0,2],[1,3]])(3)
f([
  [0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]
])(16)
