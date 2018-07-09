/**
 * @param {string} s
 * @return {number}
 */
const minCut = xs => {
  const N = xs.length
  if (N <= 1)
    return 0
  // pd[i][j] = 1 if and only if xs[i..j] is a palindrome
  const pd = new Array(N)
  for (let i = 0; i < N; ++i)
    pd[i] = new Int8Array(N)
  for (let l = 1; l <= N; ++l) {
    for (let i = 0, j = i+l-1; j < N; ++i, ++j) {
      if (i === j) {
        pd[i][i] = 1
      } else if (
        xs.codePointAt(i) === xs.codePointAt(j) &&
        (i+1 === j || pd[i+1][j-1])
      ) {
        pd[i][j] = 1
      }
    }
  }
  // in case it's palindrome by itself.
  if (pd[0][N-1])
    return 0

  // f[i]: min cut required for xs[0..i]
  const f = new Uint16Array(N)
  // f[0] = 0 as xs[0..0] is a palindrome
  for (let i = 1; i < xs.length; ++i) {
    if (pd[0][i]) {
      // nothing better than this.
      f[i] = 0
      continue
    }
    // at this point one extra cut is needed,
    // and min records f[i] - 1 to avoid some unnecessary +1s
    // save to use +Inf, as j = i-1 is always a solution to overwrite this.
    let min = +Infinity
    for (let j = 0; j < i; ++j) {
      // xs[0..j] cut and xs[j+1 .. i] is a palindrome
      if (pd[j+1][i] && f[j] < min)
        min = f[j]
    }
    f[i] = min + 1
  }
  return f[N-1]
}

console.assert(minCut("baabcbabcbabbbab") === 2)
