const dsFind = x => {
  if (x.parent !== x) {
    x.parent = dsFind(x.parent)
  }
  return x.parent
}

const dsUnion = (x,y) => {
  let xRoot = dsFind(x)
  let yRoot = dsFind(y)
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
 * @param {string[]} A
 * @return {number}
 */
const numSimilarGroups = xs => {
  // note that a string could be self-similar
  // if it contains duplicate letters
  // (in which case switching these two letters keep the whole string unchanged)
  // so the first step is to get rid of duplicated words,
  // as removing them doesn't change the result (as we just want to figure out
  // the number of groups) and we have a more simple situation to deal with

  // remove dups
  xs.sort()
  let l = 1
  for (let i = 1; i < xs.length; ++i) {
    if (xs[i] !== xs[l-1]) {
      xs[l] = xs[i]
      ++l
    }
  }
  xs.length = l

  // creating disjoint sets
  const dSets = new Array(xs.length)
  for (let i = 0; i < xs.length; ++i) {
    const node = {rank: 0}
    node.parent = node
    dSets[i] = node
  }

  const similar = (u, v) => {
    // since we know that u and v are anagrams of each other
    // and that u !== v. having exactly 2 differences should
    // guaranteed similarity.
    let diff = 0
    for (let i = 0; i < u.length && diff <= 2; ++i) {
      if (u.codePointAt(i) !== v.codePointAt(i))
        ++diff
    }
    return diff === 2
  }

  for (let i = 0; i < xs.length; ++i) {
    const dSetX = dSets[i]
    for (let j = i+1; j < xs.length; ++j) {
      const dSetY = dSets[j]
      // since querying whether two words are already in the same group
      // could be faster than testing similarity, we do this first
      // to avoid calling "similar" if possible.
      if (dsFind(dSetX) === dsFind(dSetY))
        continue
      // try merging two groups if there are similar
      if (similar(xs[i], xs[j]))
        dsUnion(dSetX, dSetY)
    }
  }
  let ans = 0
  for (let i = 0; i < xs.length; ++i)
    if (dSets[i].parent === dSets[i])
      ++ans
  return ans
}

console.log(numSimilarGroups(["tars","rats","rats", "arts","star", "star"]))
