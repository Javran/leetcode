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
  if (xRoot.rank === yRoot.rank) {
      ++xRoot.rank
  }
  return xRoot
}

/**
 * @param {string[]} words1
 * @param {string[]} words2
 * @param {string[][]} pairs
 * @return {boolean}
 */
const areSentencesSimilarTwo = (words1, words2, pairs) => {
  /*
     idea: since the relation is reflexive, transitive and symmetric,
     we can just group words into sets, and disjoint set allows us to do
     just that.
   */
  if (words1.length !== words2.length)
    return false
  // INVARIANT: words1.length === words2.length
  // word to disjoint sets
  const dSets = new Map()
  pairs.forEach(([w1,w2]) => {
    let node1, node2
    if (!dSets.has(w1)) {
      node1 = {rank: 0}
      node1.parent = node1
      dSets.set(w1, node1)
    } else {
      node1 = dSets.get(w1)
    }
    if (!dSets.has(w2)) {
      node2 = {rank: 0}
      node2.parent = node2
      dSets.set(w2, node2)
    } else {
      node2 = dSets.get(w2)
    }
    dsUnion(node1, node2)
  })

  return words1.every((word1, ind) => {
    const word2 = words2[ind]
    // no test to be done if we just happen to face two equal vals
    if (word1 === word2)
      return true
    const has1 = dSets.has(word1)
    const has2 = dSets.has(word2)
    if (has1 && has2) {
      // either they belong to the same group
      return dsFind(dSets.get(word1)) === dsFind(dSets.get(word2))
    }
    /*
       or (1) only one of them belong to a group (2) both does not belong a group,
       in either cases, it's save to return false
       (as we've eliminated the case where two can be equal)
     */
    return false
  })
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(areSentencesSimilarTwo)
f(
  ["great","acting","skills"],
  ["fine","drama","talent"],
  [["great","good"],["fine","good"],["drama","acting"],["skills","talent"]]
)(true)
f(
  ["great","acting","skills"],
  ["fine","painting","talent"],
  [["great","fine"],["drama","acting"],["skills","talent"]]
)(false)
