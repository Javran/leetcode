const freqCount = lcWords => {
  const freqs = new Uint16Array(26)
  for (let i = 0; i < lcWords.length; ++i) {
    const code = lcWords.codePointAt(i)
    // a to z
    if (code >= 97 && code <= 122) {
      ++freqs[code-97]
    }
  }
  return freqs
}

/**
 * @param {string} licensePlate
 * @param {string[]} words
 * @return {string}
 */
const shortestCompletingWord = (licensePlate, words) => {
  // idea: freq count
  let ans = null
  const lpFreqs = freqCount(licensePlate.toLowerCase())
  words.forEach(w => {
    if (ans && ans.length <= w.length)
      return
    const freq = freqCount(w)
    for (let i = 0; i < 26; ++i)
      if (freq[i] < lpFreqs[i])
        return
    if (ans === null || ans.length > w.length)
      ans = w
  })
  return ans
}

console.log(shortestCompletingWord(
  "1s3 PSt",
  ["step", "steps", "stripe", "stepple", "spst"]
))
