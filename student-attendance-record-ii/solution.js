const M = 10 ** 9 + 7
/**
 * @param {number} n
 * @return {number}
 */
const checkRecord = n => {
  const sA0 = 0, sA1 = 1
  const sL0 = 2, sL1 = 3
  const sP0 = 4, sP1 = 5
  const f = new Array(6)
  for (let i = 0; i < 6; ++i) {
    f[i] = new Uint32Array(n)
  }
  // f[sA0][0] = 0
  f[sA1][0] = 1 // "A"
  f[sL0][0] = 1 // "L"
  // f[sL1][0] = 0
  f[sP0][0] = 1 // "P"
  // f[sP1][0] = 0
  // f[sA0][1] = 0
  f[sA1][1] = 2 // "LA", "PA"
  f[sL0][1] = 2 // "LL", "PL"
  f[sL1][1] = 1 // "AL"
  f[sP0][1] = 2 // "LP", "PP"
  f[sP1][1] = 1 // "AP"
  for (let i = 2; i < n; ++i) {
    f[sA1][i] = (f[sL0][i-1] + f[sP0][i-1]) % M
    f[sL0][i] = (f[sP0][i-1] + f[sP0][i-2]) % M
    f[sL1][i] = (f[sP1][i-1] + f[sA1][i-1] + f[sA1][i-2] + f[sP1][i-2]) % M
    f[sP0][i] = (f[sL0][i-1] + f[sP0][i-1]) % M
    f[sP1][i] = (f[sL1][i-1] + f[sP1][i-1] + f[sA1][i-1]) % M
  }
  let ans = 0
  for (let i = 0; i < 6; ++i)
    ans += f[i][n-1]
  return ans % M
}

console.assert(checkRecord(1) === 3)
console.assert(checkRecord(2) === 8)
console.assert(checkRecord(100000) === 749184020)
