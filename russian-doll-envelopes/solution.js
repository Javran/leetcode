/**
 * @param {number[][]} envelopes
 * @return {number}
 */
const maxEnvelopes = es => {
  /*
     idea:

     the O(n^2) solution is easy to come up with:
     we first do pairwise comparison to figure out
     for any two envelopes i, j, whether i can be put into j,
     then this info serves as an edge in a graph g,
     once we figure out the whole graph g,
     the longest path is the answer.

     credit to TianhaoSong for the O(n * log n) idea:

     the slowdown is actually in how we deal with this "fits into" relation:
     in the general solution above, we treat it as partial order,

     for example:
     - [1,1] <= [3,2] <= [4,4]
     - [1,1] <= [2,3] <= [4,4]

     and there is no relation between [3,2] and [2,3], so we kinda want to
     work with a graph.

     but if we sort envelopes by one dimension, say width, in ascending order,
     we can have some small groups of envelopes of same width to work with:

     e.g. (still using the previous example):
     - group w = 1: [1,1], ...
     - group w = 2: [2,3], ...
     - group w = 3: [3,2], ...
     - group w = 4: [4,4], ...

     then problem becomes: select at most one element from each group
     and we want to know the maximum number of elements we can select.

     so for each group we either don't pick any element at all or pick
     exactly one element to allow heights of the selection to be an increasing sequence.

     This is almost like a standard Longest Increasing Sequence(LIS) problem but
     how do we say that we need to pick at most one element from each group?
     Well, this turns out to be an easy way: for each group of elements, sort
     height in descending order, and work out LIS base on height,
     this way, we know 2 same height can never be included in one solution,
     so we are good to go.

   */
  // ascending by width then descending by height
  es.sort((u, v) => u[0] === v[0] ? v[1] - u[1] : u[0] - v[0])
  const f = new Uint32Array(es.length)
  let len = 0
  // search for the index where v can be inserted into sorted list f[0..r-1]
  const search = (sz, v) => {
    let l = 0, r = sz
    while (l < r) {
      const mid = (l+r) >>> 1
      if (f[mid] === v) {
        return mid
      }
      if (f[mid] < v) {
        l = mid + 1
      } else {
        r = mid
      }
    }
    return r
  }
  for (let i = 0; i < es.length; ++i) {
    const h = es[i][1]
    const ind = search(len, h)
    f[ind] = h
    if (ind === len)
      ++len
  }
  return len
}

const {cTestFunc, genInt} = require('leetcode-zwischenzug')
const f = cTestFunc(maxEnvelopes)

f([[5,4],[6,4],[6,7],[2,3]])(3)
f([[1,1],[1,1],[1,1]])(1)
f([[1,17],[18,3],[5,3],[19,15],[18,9],[8,18],[5,11],[14,12],[7,17],[14,4],[10,14],[9,10],[4,12],[7,20],[12,19],[20,3],[4,14],[9,1],[1,13],[10,9],[19,4],[7,13],[1,9],[12,11],[4,20],[1,7],[18,13],[13,2],[17,3],[11,8],[9,9],[9,5],[8,13],[6,19],[6,20],[3,8],[18,7],[11,19],[10,16],[1,20],[7,17],[1,2],[13,19],[6,5],[17,17],[18,7],[18,13],[17,4],[11,11],[15,1],[20,14],[20,16],[17,4],[18,1],[14,1],[7,3],[3,13],[15,9],[2,4],[16,20],[7,3],[16,12],[3,5],[14,17],[9,2],[1,7],[18,7],[19,12],[16,15],[13,20],[19,13],[19,16],[9,9],[8,18],[8,4],[7,20],[18,20],[19,3],[1,4],[3,5],[13,15],[10,4],[7,13],[7,14],[18,11],[11,16],[14,17],[2,19],[6,10],[5,19],[17,13],[16,14],[5,5],[17,16],[19,19],[1,7],[7,11],[12,7],[20,9],[2,20]])(10)
