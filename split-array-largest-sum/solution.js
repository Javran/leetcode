/**
 * @param {number[]} nums
 * @param {number} m
 * @return {number}
 */
const splitArray = (nums, m) => {
  const N = nums.length
  const accSum = new Uint32Array(N+1)
  for (let i = 0; i < N; ++i) {
    accSum[i+1] = accSum[i] + nums[i]
  }

  // f[i][j]: min max-sum of splitting nums[0..i] into j parts
  const f = new Array(N)
  for (let i = 0; i < N; ++i)
    f[i] = new Array(m+1)
  f[0][1] = nums[0]
  for (let i = 1; i < N; ++i)
    f[i][1] = f[i-1][1] + nums[i]
  for (let j = 2; j <= m; ++j) {
    for (let i = j-1; i < N; ++i) {
      let min = +Infinity
      for (let k = j-2; k < i; ++k) {
        const cur = Math.max(f[k][j-1], accSum[i+1] - accSum[k+1])
        if (cur < min)
          min = cur
      }
      f[i][j] = min
    }
  }
  return f[N-1][m]
}

const {consoleTest, genList} = require('leetcode-zwischenzug')

consoleTest(splitArray)([1,2,3], 3)(3)
consoleTest(splitArray)([7,2,5,10,8], 2)(18)
consoleTest(splitArray)([874,184,1221,255,1744,654,1797,1705,1052,833], 2)(5387)
consoleTest(splitArray)([874,184,1221,255,1744,654,1797,1705,1052,833], 4)(3502)
consoleTest(splitArray)([874,184,1221,255,1744,654,1797,1705,1052,833], 9)(1797)
consoleTest(splitArray)([874,184,1221,255,1744,654,1797,1705,1052,833], 10)(1797)

const xs = genList(10, {l: 0, r: 2000})
console.log(JSON.stringify(xs))
