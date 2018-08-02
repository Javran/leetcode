/**
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
const findMaxForm = (strs, M, N) => {
  /*
     idea: using DP for a standard 0-1 knapsack problem
   */
  const len = strs.length
  const zeroes = new Uint16Array(len)
  const ones = new Uint16Array(len)
  for (let i = 0; i < len; ++i) {
    const st = strs[i]
    for (let j = 0; j < st.length; ++j) {
      ++(st.codePointAt(j) & 1 ? ones : zeroes)[i]
    }
  }
  const f = new Array(M+1)
  for (let i = 0; i < f.length; ++i) {
    f[i] = new Uint16Array(N+1)
  }

  for (let i = 0; i < len; ++i) {
    const zCnt = zeroes[i]
    const oCnt = ones[i]
    for (let m = M; m >= zCnt; --m) {
      for (let n = N; n >= oCnt; --n) {
        const t = f[m-zCnt][n-oCnt] + 1
        if (f[m][n] < t)
          f[m][n] = t
      }
    }
  }
  return f[M][N]
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(findMaxForm)
f(["10", "0001", "111001", "1", "0"], 5, 3)(4)
f(["10", "0", "1"], 1, 1)(2)
