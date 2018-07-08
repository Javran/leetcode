function TrieNode(key, wordObj=null) {
  this.key = key
  // {word, ind} if not null
  this.wordObj = wordObj
  this.children = new Array(128)
}

/**
 * @param {string[]} words
 * @return {number[][]}
 */
const palindromePairs = words => {
  // backward trie - words are index-ed by their reverses for searching palindrome
  const bwTrie = new TrieNode(null)
  // word: word used to go to the path, could be reversed.
  const trieIns = (word, wordObj) => {
    let cur = bwTrie
    for (let i = 0; i < word.length; ++i) {
      const code = word.codePointAt(i)
      if (!(code in cur.children)) {
        cur.children[code] = new TrieNode(code)
      }
      cur = cur.children[code]
    }
    cur.wordObj = wordObj
  }
  let emptyWordInd = null
  words.forEach((word, ind) => {
    if (word === "") {
      emptyWordInd = ind
      return
    }
    const revWord = word.split('').reverse().join('')
    trieIns(revWord, {word, ind})
  })
  const getPath = (path, all) => {
    let cur = bwTrie
    for (let i = 0; cur && i < path.length; ++i) {
      const code = path.codePointAt(i)
      cur = cur.children[code] || null
    }
    if (cur === null)
      return null
    if (!all) {
      return cur.wordObj
    }
    const ret = []
    const collect = trie => {
      if (trie.wordObj !== null)
        ret.push(trie.wordObj)
      trie.children.forEach(collect)
    }
    collect(cur)
    return ret.length > 0 ? ret : null
  }
  const ans = []
  const isPalindrome = (s, begin, end) => {
    for (let i = begin, j = end; i < j; ++i, --j)
      if (s.codePointAt(i) !== s.codePointAt(j))
        return false
    return true
  }

  words.forEach((word, ind) => {
    if (word === "")
      return
    // case 1: this wordLen <= half of palindrom length
    const candidates = getPath(word, true)
    if (candidates) {
      candidates.forEach(cObj => {
        const cWord = cObj.word
        if (
          cObj.ind !== ind &&
          isPalindrome(cWord, 0, cWord.length-word.length-1)
        ) {
          ans.push([ind, cObj.ind])
        }
      })
    }
    // case 2: this wordLen > half of palindrom length
    for (let lastInd = word.length-2; lastInd >= 0; --lastInd) {
      // see if word[0..lastInd] ++ ? ++ word[0..lastInd] is a palindrome
      if (isPalindrome(word, lastInd+1, word.length-1)) {
        const cObj = getPath(word.substring(0, lastInd+1), false)
        if (cObj !== null && cObj.ind !== ind) {
          ans.push([ind, cObj.ind])
        }
      }
    }
  })
  if (emptyWordInd !== null) {
    words.forEach((w, ind) => {
      if (
        ind !== emptyWordInd &&
        isPalindrome(w, 0, w.length-1)
      ) {
        ans.push([emptyWordInd, ind])
        ans.push([ind, emptyWordInd])
      }
    })
  }
  return ans
}

console.log(
  palindromePairs([
    "abcd", "dcba", "lls", "s", "sssll",
    "acdef", "edca", "acdee", "dca", "atuvu", "ta",
    "ccc", "cccc",
    // to problem setter: FUCK YOU.
    ""
  ]))

console.log(palindromePairs(["a",""]))
console.log(palindromePairs(["a","abc","aba",""]))
