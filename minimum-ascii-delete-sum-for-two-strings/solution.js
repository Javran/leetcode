/**
 * @param {string} s1
 * @param {string} s2
 * @return {number}
 */
const minimumDeleteSum = (s1, s2) => {
  if (s2.length < s1.length) {
    // the problem is symmetric, slightly optimize
    // by allowing the longer one to be rows in DP.
    const tmp = s1
    s1 = s2
    s2 = tmp
  }
  /*
     idea: similar to classical dynamic programming of LCS:

     let f[i][j] be solution for s1[0..i-1], s2[0..j-1]

     f[i][j] = min of:

     - f[i-1][j] + s1[i]
     - f[i][j-1] + s2[j]
     - (only possible when s1[i] === s2[j]) f[i-1][j-1]

     notice that computing f[i][j] only requires f[i-1][...],
     we can recycle to allow taking only O(n) space.
   */
  const f = [
    new Uint32Array(s2.length + 1),
    new Uint32Array(s2.length + 1),
  ]
  for (let j = 0; j < s2.length; ++j)
    f[0][j+1] = f[0][j] + s2.codePointAt(j)
  for (
    let i = 1, i0 = 1, i1 = 0;
    i <= s1.length;
    ++i, i0 = 1 - i0, i1 = 1 - i1
  ) {
    const c1 = s1.codePointAt(i-1)
    f[i0][0] = f[i1][0] + c1
    for (let j = 1; j <= s2.length; ++j) {
      const c2 = s2.codePointAt(j-1)
      let min = Math.min(f[i1][j] + c1, f[i0][j-1] + c2)
      if (c1 === c2 && min > f[i1][j-1])
        min = f[i1][j-1]
      f[i0][j] = min
    }
  }
  return f[s1.length & 1][s2.length]
}

console.log(minimumDeleteSum("delete", "leet"))
