const codeA = 'a'.codePointAt(0)

/**
 * @param {string} pattern
 * @param {string} str
 * @return {boolean}
 */
const wordPattern = (pattern, str) => {
  const words = str.split(' ')
  if (pattern.length !== words.length)
    return false
  const N = pattern.length
  if (N === 0)
    // I'm not sure how to make sense of this
    // but it seems so by feeding custom input.
    return false
  const patMap = new Array(26).fill(null)
  for (let i = 0; i < N; ++i) {
    const pat = pattern.codePointAt(i) - codeA
    if (patMap[pat] === null) {
      patMap[pat] = words[i]
    } else {
      if (patMap[pat] !== words[i])
        return false
    }
  }
  const xs = patMap.filter(x => x !== null)
  const xsSet = new Set(xs)
  return xs.length === xsSet.size
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(wordPattern)
f('', '')(false)
f("abba", "dog cat cat dog")(true)
f("abba", "dog cat cat fish")(false)
f("aaaa", "dog cat dog cat")(false)
f("abba", "dog dog dog dog")(false)
