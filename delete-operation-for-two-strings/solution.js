/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
const minDistance = (word1, word2) => {
  const M = word1.length
  const N = word2.length
  const f = new Array(M+1)
  for (let i = 0; i <= M; ++i)
    f[i] = new Int16Array(N+1)
  for (let i = 1; i <= M; ++i) {
    for (let j = 1; j <= N; ++j) {
      let cur = Math.max(f[i][j-1], f[i-1][j])
      if (word1.codePointAt(i-1) === word2.codePointAt(j-1)) {
        cur = Math.max(cur, f[i-1][j-1]+1)
      }
      f[i][j] = cur
    }
  }
  return M+N - 2*f[M][N]
}

const {cTestFunc} = require('leetcode-zwischenzug')
const f = cTestFunc(minDistance)

f("sea", "eat")(2)
f("aajfdsjsjsjsjsdkjflajkl", "ajjjkljjjssjsjs")(20)
f("", "aaa")(3)
f("aaaa", "")(4)
