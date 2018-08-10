/**
 * @param {character[]} chars
 * @return {number}
 */
const compress = chars => {
  /*
     idea: since the "compressed" array is always
     less than or equal to the original one,
     the last index of output array can never go past
     index of input array, which suggests that we
     can reuse input array in-place without worrying
     about overlapping issues.

   */
  // output index
  let oInd = 0
  const record = x => {
    chars[oInd] = x
    ++oInd
  }
  let ch = null
  let count
  for (let i = 0; i < chars.length; ++i) {
    if (ch === null || ch !== chars[i]) {
      if (ch !== null) {
        if (count > 1) {
          record(ch)
          // note that this is safe to do as long as count > 1
          // so that compressed string is never longer
          String(count).split('').map(record)
        } else {
          record(ch)
        }
      }
      ch = chars[i]
      count = 1
    } else if (ch === chars[i]) {
      ++count
    }
  }
  if (ch !== null) {
    if (count > 1) {
      record(ch)
      String(count).split('').map(record)
    } else {
      record(ch)
    }
  }
  return oInd
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(function compressW(xs) {
  const l = compress(xs)
  xs.length = l
  return xs
})

f(["a","a","b","b","c","c","c"])("a2b2c3".split(''))
f(["a"])(["a"])
f(["a","b","b","b","b","b","b","b","b","b","b","b","b"])("ab12".split(''))
