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
  words.sort()
  // freq count
  const wordFreqs = []
  let curWF = {word: words[0], count: 1}
  for (let i = 1; i < words.length; ++i) {
    if (curWF.word === words[i]) {
      ++curWF.count
    } else {
      wordFreqs.push(curWF)
      curWF = {word: words[i], count: 1}
    }
  }
  wordFreqs.push(curWF)
  // now that in wordFreqs, every word is unique
  // matches[i] = index into wordFreqs or null
  const matches = new Array(s.length).fill(null)
  wordFreqs.forEach(({word}, ind) => {
    for (let i = s.indexOf(word); i !== -1; i = s.indexOf(word, i+1)) {
      matches[i] = ind
    }
  })
  const ans = []
  // apply sliding window on every offset
  for (let offset = 0; offset < wordLen; ++offset) {
    const freqCount = new Array(wordFreqs.length).fill(0)
    for (let i = offset; i < s.length; i += wordLen) {
      // new freq
      if (matches[i] !== null) {
        ++freqCount[matches[i]]
      }
      // remove old
      const prevInd = i-words.length*wordLen
      if (prevInd >= 0 && matches[prevInd] !== null) {
        --freqCount[matches[prevInd]]
      }
      if (freqCount.every((freq, ind) => freq >= wordFreqs[ind].count)) {
        ans.push(prevInd+wordLen)
      }
    }
  }
  return ans
}

console.log(findSubstring("barfoothefoobarman", ["foo","bar"]))
console.log(findSubstring("wordgoodgoodgoodbestword", ["word","good","best","word"]))
console.log(findSubstring("wordwordgoodbestwordword", ["word","good","best","word"]))
console.log(findSubstring("awordwordgoodbestwordword", ["word","good","best","word"]))
console.log(findSubstring("abwordwordgoodbestwordword", ["word","good","best","word"]))
console.log(findSubstring("abcwordwordgoodbestwordword", ["word","good","best","word"]))
console.log(findSubstring("abcabcbbacbbababbcaccb", ["ab","ac","bc","ab"]))
