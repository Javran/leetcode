/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
const minDistance = (word1, word2) => {
  /*

     idea: note that the only allowed operation is deletion,
     we just need to find the longest common sequence (LCS)
     and remove all the rest.

     standard LCS should work then.

   */
  const M = word1.length
  const N = word2.length
  const f = new Array(M+1)
  for (let i = 0; i <= M; ++i)
    f[i] = new Int16Array(N+1)
  for (let i = 1; i <= M; ++i) {
    const c1 = word1.codePointAt(i-1)
    for (let j = 1; j <= N; ++j) {
      if (c1 === word2.codePointAt(j-1)) {
        f[i][j] = f[i-1][j-1]+1
      } else {
        f[i][j] = Math.max(f[i][j-1], f[i-1][j])
      }
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
