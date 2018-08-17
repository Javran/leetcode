/**
 * @param {number} n
 * @return {number[][]}
 */
const getFactors = n => {
  /*
     idea: DFS will do.
   */
  const cur = []
  const ans = []
  const search = (x, min, dep) => {
    if (x === 1) {
      /*
         for the constraint "<= n",
         we just need to make sure that the length is at least 2
         since we know 1 cannot be included in cur (as we begin with 2),
         as long as dep > 1, we cannot reach n.
       */
      if (dep > 1)
        ans.push(cur.slice(0, dep))
      return
    }
    for (let i = min; i <= x; ++i) {
      if (x % i === 0) {
        cur[dep] = i
        search(x / i, i, dep+1)
      }
    }
  }
  search(n, 2, 0)
  return ans
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(getFactors)
f(1)()
f(37)()
f(12)()
f(32)()
