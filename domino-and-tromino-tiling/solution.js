const M = 1000000007

/**
 * @param {number} N
 * @return {number}
 */
const numTilings = N => {
  /*
     let f[i][0] be: col [1..i] fully filled (1-based):

     ????
     ????
        i

     f[i][1] be: col [1..i-1] fully filled with upper cell of i filled

     ????
     ???
        i

     f[i][1] be: col [1..i-1] fully filled with lower cell of i filled

     ???
     ????
        i

     f[i][0] = f[i-1][0] (case 1) + f[i-2][0] (case 2)
             + f[i-1][1] (case 3) + f[i-1][2] (case 4)

     case 1: | case 2: | case 3: | case 4:

     ???A      ??AA      ???A      ??AA
     ???A      ??BB      ??AA      ???A
        i         i         i         i

     f[i][1] = f[i-2][0] + f[i-1][2]

     case 1: | case 2:

     ??AA      ??AA
     ??A       ???
        i         i

     f[i][2] = f[i-2][0] + f[i-1][1]

     case 1: | case 2:

     ??A       ???
     ??AA      ??AA
        i         i

     and the answer is f[N][0]
     also don't forget to mod 10^9+7
   */
  const f0 = new Uint32Array(N+1)
  const f1 = new Uint32Array(N+1)
  const f2 = new Uint32Array(N+1)
  f0[0] = 1
  f0[1] = 1
  for (let i = 2; i <= N; ++i) {
    const a = (f0[i-1] + f0[i-2]) % M
    const b = (f1[i-1] + f2[i-1]) % M
    f0[i] = (a+b) % M
    f1[i] = (f0[i-2] + f2[i-1]) % M
    f2[i] = (f0[i-2] + f1[i-1]) % M
  }
  return f0[N]
}

console.assert(numTilings(12) === 6105)
console.assert(numTilings(1000) === 979232805)
