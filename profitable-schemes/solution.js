const M = 10 ** 9 + 7
/**
 * @param {number} G
 * @param {number} P
 * @param {number[]} group
 * @param {number[]} profit
 * @return {number}
 */
const profitableSchemes = (G, P, group, profit) => {
  /*
     idea: 0-1 knapsack with one saved dimension.
   */
  const N = group.length
  /*
     let f[p][g][i] be # of schemes with p profit and g members where
     we have taken into account crimes 0..i-1 and is considering
     crime i with grp = group[i] and prof = profit[i]:

     f[p+prof][g+grp][i] += f[p][g][i-1]

     note that we can choose to not consider crime i at all then f[p+0][g+0][i] === f[p][g][i-1].
     this suggest that we can get rid of the last dimension (i.e. [i] here)
     and just use f[p][g][i-1] as if we have considered the case that crime i is not committed.

   */
  const f = new Array(P+1)
  for (let i = 0; i <= P; ++i)
    f[i] = new Uint32Array(G+1)
  f[0][0] = 1
  for (let i = 0; i < N; ++i) {
    const grp = group[i]
    const prof = profit[i]
    // running p downward since we are doing 0-1 knapsack so to avoid taking the same scheme more than once
    for (let p = P; p >= 0; --p) {
      for (let j = G - grp; j >= 0; --j) {
        if (p+prof < P) {
          f[p+prof][j+grp] = (f[p+prof][j+grp] + f[p][j]) % M
        } else {
          // special case as p+prof can go beyong P
          f[P][j+grp] = (f[P][j+grp] + f[p][j]) % M
        }
      }
    }
  }

  return f[P].reduce((x,y) => (x+y) % M, 0)
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(profitableSchemes)
f(10,5,[2,3,5],[6,7,8])(7)
