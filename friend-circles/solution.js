const dsFind = x => {
  if (x.parent !== x)
    x.parent = dsFind(x.parent)
  return x.parent
}

const dsUnion = (x,y) => {
  let xRoot = dsFind(x), yRoot = dsFind(y)
  if (xRoot === yRoot)
    return xRoot
  if (xRoot.rank < yRoot.rank) {
    const tmp = xRoot
    xRoot = yRoot
    yRoot = tmp
  }
  yRoot.parent = xRoot
  if (xRoot.rank === yRoot.rank)
    ++xRoot.rank
  return xRoot
}

/**
 * @param {number[][]} M
 * @return {number}
 */
const findCircleNum = M => {
  /*
     idea: a disjoint-set does the trick,
     as it handles indirect relations nicely.
   */
  const N = M.length
  const dSets = new Array(N)
  for (let i = 0; i < N; ++i) {
    const s = {rank: 0}
    s.parent = s
    dSets[i] = s
  }
  for (let i = 0; i < N; ++i) {
    // we just need to check half of M
    // as it's quite symmetric.
    for (let j = i+1; j < N; ++j) {
      if (M[i][j] === 1) {
        dsUnion(dSets[i], dSets[j])
      }
    }
  }
  let ans = 0
  for (let i = 0; i < N; ++i) {
    if (dsFind(dSets[i]) === dSets[i])
      ++ans
  }
  return ans
}
