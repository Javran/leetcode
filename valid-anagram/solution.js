const codeA = 'a'.codePointAt(0)

const freqCount = s => {
  const freqs = new Uint16Array(26)
  for (let i = 0; i < s.length; ++i)
    ++freqs[s.codePointAt(i) - codeA]
  return freqs
}

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const isAnagram = (s, t) => {
  /*
     idea: to be anagram is to be equivalent under freq count.
   */
  if (s.length !== t.length)
    return false
  const xs = freqCount(s)
  const ys = freqCount(t)
  return xs.every((x, ind) => x === ys[ind])
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(isAnagram)

f("anagram", "nagaram")(true)
f("aaa", "aaa")(true)
f("aba", "bba")(false)
f("rat", "car")(false)
