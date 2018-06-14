/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
const wordBreak = (s, wordDict) => {
  const mkTrie = () => ({root: new Map(), word: null})
  const trie = mkTrie()
  wordDict.map(w => {
    let curTrie = trie
    for (let i = 0; i < w.length; ++i) {
      const ch = w[i]
      if (!curTrie.root.has(ch)) {
        curTrie.root.set(ch, mkTrie())
      }
      curTrie = curTrie.root.get(ch)
    }
    curTrie.word = w
  })

  let curStates = [{curTrie: trie, words: []}]
  const updateState = (curState, ch, nextStates) => {
    const {curTrie, words} = curState
    if (!curTrie.root.has(ch))
      return
    const nextTrie = curTrie.root.get(ch)
    nextStates.push({curTrie: nextTrie, words})
    if (nextTrie.word !== null) {
      const nextWords = words.slice()
      nextWords.push(nextTrie.word)
      nextStates.push({curTrie: trie, words: nextWords})
    }
  }
  for (let i = 0; i < s.length; ++i) {
    const nextStates = []
    for (let j = 0; j < curStates.length; ++j)
      updateState(curStates[j], s[i], nextStates)
    curStates = nextStates
  }
  const ans = []
  curStates.map(curState => {
    if (curState.curTrie === trie)
      ans.push(curState.words.join(' '))
  })
  return ans
}

console.log(wordBreak("catsanddog", ["cat", "cats", "and", "sand", "dog"]))
console.log(wordBreak("pineapplepenapple", ["apple", "pen", "applepen", "pine", "pineapple"]))
