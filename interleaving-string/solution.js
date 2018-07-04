/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
const isInterleave = (a, b, c) => {
  if (a.length + b.length !== c.length)
    return false
  const f = new Array(a.length+1)
  for (let i = 0; i <= a.length; ++i)
    f[i] = new Array(b.length+1)
  // f[i][j], whether a in [0..i-1] and b in [0..j-1]
  // can be interleaved to produce c in range [0..i+j-1]
  f[0][0] = true
  for (let k = 1; k <= c.length; ++k) {
    // k = i + j
    const code = c.codePointAt(k-1)
    for (let i = 0; i <= k; ++i) {
      const j = k - i
      if (i > a.length || j > b.length)
        continue
      let ans = false
      if (i-1 >= 0 && f[i-1][j] && a.codePointAt(i-1) === code)
        ans = true
      if (j-1 >= 0 && f[i][j-1] && b.codePointAt(j-1) === code)
        ans = true
      f[i][j] = ans
    }
  }
  return f[a.length][b.length]
}

console.log(isInterleave("aabcc", "dbbca", "aadbbcbcac"))
console.log(isInterleave("aabcc", "dbbca", "aadbbbbcac"))
console.log(isInterleave("", "dbbca", "dbbca"))
console.log(isInterleave("vv", "uu", "uuvv"))
console.log(isInterleave("vv", "uu", "uvuv"))
console.log(isInterleave("15", "51", "1551"))
console.log(isInterleave("aazaa", "bbtbb", "abaztbaabb"))
