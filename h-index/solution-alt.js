/**
 * @param {number[]} citations
 * @return {number}
 */
const hIndex = cs => {
  // FUCK THIS PROBLEM.
  const N = cs.length
  const counts = new Uint32Array(N+1)
  for (let i = 0; i < N; ++i) {
    // the observation is that any value >= N can be changed to N
    // without affecting the final result
    ++counts[cs[i] > N ? N : cs[i]]
  }
  // tabulate this to see how it works: https://leetcode.com/problems/h-index/solution/
  // we want the largest k where k <= s_k where s_k = counts[N] + counts[N-1] + ... + counts[k]
  let k, s
  for (s = counts[N], k = N; k > s; --k, s += counts[k]) {
    // NOOP
  }
  return k
}

const assert = require('assert')
assert.equal(hIndex([11,15]),2)
console.assert(hIndex([1]) === 1)
console.assert(hIndex([3,0,6,1,5]) === 3)
console.assert(hIndex([1,2,3,4,5,5,6,6,6,7]) === 5)
console.assert(hIndex([1,2,2]) === 2)
console.assert(hIndex([]) === 0)
console.assert(hIndex([0]) === 0)
