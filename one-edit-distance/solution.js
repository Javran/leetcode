/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const isOneEditDistance = (s, t) => {
  /*
     idea:
     - if we can make sure that s.len >= t.len,
       we'll only need to worry about replace and deletion
     - s.len === t.len takes care of replace
     - s.len > t.len takes care of deletion
   */
  if (Math.abs(s.length - t.length) > 1)
    return false
  if (s.length < t.length) {
    const tmp = s
    s = t
    t = tmp
  }
  // INVARIANT: s.length >= t.length
  if (s.length === t.length) {
    // must be replace
    let diffCount = 0
    for (let i = 0; i < s.length && diffCount <= 1; ++i) {
      if (s.codePointAt(i) !== t.codePointAt(i))
        ++diffCount
    }
    return diffCount === 1
  } else {
    // as s.length > t.length, we only need to consider deletions
    let diff = 0
    for (let i = 0; i < s.length && diff <= 1; ++i) {
      if (s.codePointAt(i+diff) !== t.codePointAt(i)) {
        ++diff
        // t.codePointAt(i) needs another comparison when previous diff has failed.
        --i
      }
    }
    return diff === 1
  }
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(isOneEditDistance)
f("ab", "acb")(true)
f("cab", "ad")(false)
f("1203", "1213")(true)
f("abab", "abab")(false)
