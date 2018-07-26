const codeA = 'a'.codePointAt(0)

/**
 * @param {string[]} strings
 * @return {string[][]}
 */
const groupStrings = xs => {
  /*
     idea: normalize the string by forcing first char to be 'a',
     then we can group them by using the result of normalization as key.
   */
  const norm = s => {
    if (s.length === 0)
      return ''
    // normalize by making sure first one is 'a'
    const diff = 26 - (s.codePointAt(0) - codeA)
    const rets = []
    for (let i = 0; i < s.length; ++i) {
      rets[i] = (s.codePointAt(i) - codeA + diff) % 26 + codeA
    }
    return rets.map(x => String.fromCharCode(x)).join('')
  }
  const grp = new Map()
  for (let i = 0; i < xs.length; ++i) {
    const x = xs[i]
    const k = norm(x)
    if (grp.has(k)) {
      grp.get(k).push(x)
    } else {
      grp.set(k, [x])
    }
  }
  return [...grp.values()]
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(groupStrings)

f(["abc", "bcd", "acef", "xyz", "az", "ba", "a", "z"])()
