/**
 * @param {string} s1
 * @param {string} s2
 * @return {number}
 */
const minimumDeleteSum = (s1, s2) => {
  const f = new Array(s1.length + 1)
  for (let i = 0; i <= s1.length; ++i)
    f[i] = new Uint32Array(s2.length + 1)
  for (let i = 0; i < s1.length; ++i)
    f[i+1][0] = f[i][0] + s1.codePointAt(i)
  for (let j = 0; j < s2.length; ++j)
    f[0][j+1] = f[0][j] + s2.codePointAt(j)
  for (let i = 1; i <= s1.length; ++i) {
    for (let j = 1; j <= s2.length; ++j) {
      let min = Math.min(f[i-1][j] + s1.codePointAt(i-1), f[i][j-1] + s2.codePointAt(j-1))
      if (s1.codePointAt(i-1) === s2.codePointAt(j-1) && min > f[i-1][j-1])
        min = f[i-1][j-1]
      f[i][j] = min
    }
  }
  return f[s1.length][s2.length]
}

console.log(minimumDeleteSum("delete", "leet"))
