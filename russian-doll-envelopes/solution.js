/**
 * @param {number[][]} envelopes
 * @return {number}
 */
const maxEnvelopes = es => {
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
