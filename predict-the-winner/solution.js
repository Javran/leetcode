/**
 * @param {number[]} nums
 * @return {boolean}
 */
const PredictTheWinner = nums => {
  /*
     idea: memoized search sounds good enough,
     actually the code is directly modified from my `stone-game` solution.
   */
  const N = nums.length
  const memoize = f => {
    const xs = new Array(N)
    return x => {
      if (x in xs) {
        return xs[x]
      } else {
        xs[x] = f(x)
        return xs[x]
      }
    }
  }
  // let search(l)(r) be `current player - opposite` on score.
  const search = memoize(l => memoize(r => {
    if (l > r)
      return 0
    return Math.max(nums[l] - search(l+1)(r), nums[r] - search(l)(r-1))
  }))
  return search(0)(N-1) >= 0
}

const {consoleTest, genList} = require('leetcode-zwischenzug')
const f = consoleTest(PredictTheWinner)
f([1,5,2])(false)
f([1,5,233,7])(true)
f([309,1855,1633,1116,1822,1854,578,444,1932,1149,1379,1519,854,1398,301,548,365,1151,442,1865])(true)
f([917,786,1006,75,1148,490,398,979,198,1218,842,766,836,1855,1302,1146,1534,977,1735,617])(true)

console.log(JSON.stringify(genList(20,{l:0, r: 2000})))
