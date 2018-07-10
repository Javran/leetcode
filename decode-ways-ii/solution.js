/*
   possible ways to decode a string unit,
   in other words, the string has to be considered as a whole.

   assume that 1 <= st.length <= 2 and st[?] = '0'-'9' or '*'
 */
const decodeWays = st => {
  if (st === '*')
    // 1 - 9
    return 9
  if (st[0] === '0')
    // no leading '0' allowed under all circumstances
    return 0
  if (st.length === 1)
    // '1' - '9'
    return 1
  if (st === '**')
    /*
       11 ~ 19: 9
       21 ~ 26: 6
     */
    return 15
  if (st[0] === '*') {
    // pattern '*[d]'
    const d = Number(st[1])
    if (d <= 6) {
      // 10 or 20 | 11 or 21 | 12 or 22 | ... | 16 or 26
      return 2
    } else {
      // INVARIANT: d >= 7
      // 17 / 18 / 19
      return 1
    }
  }
  if (st[1] === '*') {
    // pattern '[d]*'
    const d = Number(st[0])
    // d === 0 is impossible
    if (d > 2)
      return 0
    if (d === 1)
      // 11 ~ 19
      return 9
    if (d === 2)
      // 21 ~ 26
      return 6
    throw new Error('unreachable')
  }
  // remaining case: '[d1][d2]' where d1 !== 0
  const n = parseInt(st, 10)
  return n >= 10 && n <= 26 ? 1 : 0
}

const M = 10**9+7

/**
 * @param {string} s
 * @return {number}
 */
const numDecodings = s => {
  /*
     idea: dynamic programming ftw.

     be careful about two things:

     - '*' stands for '1' - '9' but not '0'
     - make sure to `% M`, as the number blows up quickly

   */
  // let f[i] be the way of decoding [0..i-1].
  const f = new Int32Array(s.length+1)
  f[0] = 1
  f[1] = decodeWays(s[0])
  for (let i = 2; i <= s.length; ++i) {
    const way1 = (f[i-1] * decodeWays(s.substr(i-1, 1))) % M
    const way2 = (f[i-2] * decodeWays(s.substr(i-2, 2))) % M
    f[i] = (way1+way2) % M
  }
  return f[s.length]
}

console.assert(numDecodings(
  "3134*********************4534*****"
) === 713571201)
