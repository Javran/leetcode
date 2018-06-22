const letterTmp = new Uint8Array(256)
for (let i = 65; i <= 90; ++i) {
  letterTmp[i] = 1
  letterTmp[i+32] = 1
}

/**
 * @param {string} paragraph
 * @param {string[]} banned
 * @return {string}
 */
const mostCommonWord = (paragraph, bans) => {
  const banSet = new Set(bans)
  const freq = new Map()
  const paraIsLetter = ind =>
    Boolean(letterTmp[paragraph.codePointAt(ind)])
  let i = 0;
  while (i < paragraph.length) {
    if (paraIsLetter(i)) {
      let j = i
      while (
        j+1 < paragraph.length &&
        paraIsLetter(j+1)
      )
        ++j
      const word = paragraph.substring(i,j+1).toLowerCase()
      if (!banSet.has(word)) {
        if (!freq.has(word))
          freq.set(word, 1)
        else
          freq.set(word, freq.get(word) + 1)
      }
      i = j + 1
    } else {
      ++i
    }
  }
  // answer is guaranteed, so placeholder values will surely be replaced
  let maxFreq = null, maxWord
  freq.forEach((freq, word) => {
    if (maxFreq === null || freq > maxFreq) {
      maxFreq = freq
      maxWord = word
    }
  })
  return maxWord
}

console.log(
  mostCommonWord(
    "Bob hit a ball, the hit BALL flew far after it was hit.",
    ["hit"]
  )
)
