/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
const findSubstring = (s, words) => {
  if (words.length === 0)
    // to problem setter: FUCK YOU
    return []
  const wordLen = words[0].length
  // store indices of words.
  const matches = new Array(s.length).fill(null)
  words.forEach((word, ind) => {
    for (let i = s.indexOf(word); i !== -1; i = s.indexOf(word, i+1)) {
      if (matches[i] === null) {
        matches[i] = [ind]
      } else {
        matches[i].push(ind)
      }
    }
  })
  const ans = []
  const checkWindow = w => {
    if (w.length !== words.length)
      return false
    const flags = new Array(words.length).fill(0)
    for (let i = 0; i < w.length; ++i) {
      if (w[i] === null)
        return false
      let fill = false
      for (let j = 0; j < w[i].length && !fill; ++j) {
        if (flags[w[i][j]] === 0) {
          flags[w[i][j]] = 1
          fill = true
        }
      }
      if (!fill)
        return false
    }
    return flags.every(x => x > 0)
  }
  // apply sliding window on every offset
  for (let offset = 0; offset < wordLen; ++offset) {
    const window = []
    for (let i = offset; i < s.length; i += wordLen) {
      window.push(matches[i])
      if (window.length > words.length)
        window.shift()
      if (checkWindow(window))
        ans.push(i-(words.length-1)*wordLen)
    }
  }
  return ans
}

console.log(findSubstring("barfoothefoobarman", ["foo","bar"]))
// console.log(findSubstring("wordgoodgoodgoodbestword", ["word","good","best","word"]))
console.log(findSubstring("wordwordgoodbestwordword", ["word","good","best","word"]))
