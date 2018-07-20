const M = 10 ** 9 + 7
/*
   first attempt (not working):

   - since we allow 'A' to present at most once, we may just as well totally remove it
     and add it back later.

   - let f(i,ch) mean # of solutions for 0..i where last char is ch, now we only have 'L' and 'P'
     to consider:

     f(i, 'L') = f(i-2, 'P') // when [i-1] is "L", [i-2..i] must be "PLL"
               + f(i-1, 'P') // [i-1..i] is "PL"
     ...

   - this does not work because there are actually interaction between 'A' and 'L':
     if we insert an 'A' in the middle of some "LLL", this would make some solution valid
     so we end up having less results
 */

/**
 * @param {number} n
 * @return {number}
 */
const checkRecord = n => {
  /*
     idea: nonetheless the failed attempt does show that f(i, <char>) is promising,
     but we need to take into account presence of 'A': it's allow at most once, why
     don't we include that as one part of the state as well?

     let f(<char>, <# of 'A's>, i) be solution of [0..i] where <char> is the last character
     then we can work out all the rest without problem.

     also since we only have #({'A', 'L', 'P'} x {0, 1}) = 6 states, we can just encode it as well
   */
  const sA0 = 0, sA1 = 1
  const sL0 = 2, sL1 = 3
  const sP0 = 4, sP1 = 5
  const f = new Array(6)
  for (let i = 0; i < 6; ++i) {
    f[i] = new Uint32Array(n)
  }
  /*
     after DP formula is done, it's easy to see f(?, ?, i) might require value from f(?, ?, i-1).
     that's why we prepare f(?,?,0) and f(?,?,1)
   */
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
    // notation: all "XXXX" in this block means a suffix of [0..i]
    /*
       no "A" is allowed before any "A", so we can only do "LA" and "PA"
     */
    f[sA1][i] = (f[sL0][i-1] + f[sP0][i-1]) % M
    /*
       3 cases:
       - "AL", not related due to presence of "A"
       - "LL" => "ALL" (not ok) / "LLL" (not ok) / "PLL"
       - "PL", ok
     */
    f[sL0][i] = (f[sP0][i-1] + f[sP0][i-2]) % M
    /*
       3 cases:
       - "AL", ok
       - "LL" => "ALL" / "LLL" (not ok) / "PLL"
       - "PL", ok
     */
    f[sL1][i] = (f[sP1][i-1] + f[sA1][i-1] + f[sA1][i-2] + f[sP1][i-2]) % M
    /*
       "LP" or "PP"
     */
    f[sP0][i] = (f[sL0][i-1] + f[sP0][i-1]) % M
    /*
       "AP", "LP" or "PP"
     */
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
