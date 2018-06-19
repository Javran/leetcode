/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
const wordBreak = (s, wordDict) => {
  // dynamic programming as we have seen.
  // if it is possible to have positional range (0,x) covered by words
  const f = new Array(s.length + 1).fill(false)
  f[0] = true
  for (let i = 1; i <= s.length; ++i) {
    for (let j = 0; j < wordDict.length && !f[i]; ++j) {
      const w = wordDict[j]
      const prev = i - w.length
      if (
        prev >= 0 &&
        s.substr(prev, w.length) === w &&
        f[prev]
      )
        f[i] = true
    }
  }
  return f[s.length]
}

console.log(wordBreak("aabbccde",["aa","cde","bbcc","e","d"]))
console.log(wordBreak("aabbccde",["aa","cde","bbcc"]))
console.log(wordBreak("applepenapple", ["apple", "pen"]))
