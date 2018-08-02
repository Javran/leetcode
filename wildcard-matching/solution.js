/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
const isMatch = (str, patRaw) => {
  /*
     since pattern "*" is the same as "**", "***", "****" ...,
     we might as well remove duplicates when it occurs,
     this reduces the amount of "backtracking".
   */
  const pat = []
  for (let i = 0; i < patRaw.length; ++i) {
    const s = patRaw[i]
    if (
      pat.length === 0 ||
      s !== '*' ||
      pat[pat.length-1] !== '*'
    ) {
      pat.push(s)
    }
  }
  const f = new Array(str.length+1)
  // tmp[i] records if pat[0..i] has been matched.
  const tmp = new Uint8Array(pat.length)
  for (let i = 0; i <= str.length; ++i)
    f[i] = new Uint8Array(pat.length+1)
  /*
     idea: dynamic programming.

     - f[i][j]: bool tells if str[0..i-1] and pat[0..j-1] matches.
     - straightforward recurrence relation for literal pattern or pattern '?' from f[i-1][j-1]
     - if pattern is '*', we'll need to check if any of f[k][j-1] matches,
       fortunately we can store this info (by `tmp` above) so we don't end up trying all previously
       encountered `i`s.
   */
  f[0][0] = 1
  if (pat[0] === '*') {
    /*
       well, we have to handle this specially because '*' can match any string.
     */
    for (let i = 0; i <= str.length; ++i)
      f[i][1] = 1
  }
  for (let i = 1; i <= str.length; ++i) {
    const s = str[i-1]
    for (let j = 1; j <= pat.length; ++j) {
      const p = pat[j-1]
      if (p === '?' || p === s) {
        if (f[i-1][j-1])
          f[i][j] = 1
      }
      if (p === '*') {
        /*
           current pattern char is pat[j-1],
           and we want to know if pat[0..j-2] are matched
           with some str[0..?] where ? is any index of str we have encountered so far.
           this means that we can let '*' consume str[?+1 .. i-1] so that
           str[0..i-1] can match with pat[0..j-1]
        */
        if (tmp[j-2])
          f[i][j] = 1
      }
      if (f[i][j]) {
        tmp[j-1] = 1
      }
    }
  }
  return Boolean(f[str.length][pat.length])
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(isMatch)

f("aa", "a")(false)
f("aa", "***")(true)
f("cb", "?a")(false)
f("adceb","*****a**b")(true)
f("acdcb", "a*c?b")(false)
f("adceb","*a*b")(true)
f("a","*a")(true)
f("acdcb", "a*?dcb")(true)
f("adcb", "a*?dcb")(false)
f("abb", "c*a*b")(false)
