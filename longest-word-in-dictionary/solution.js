function TrieNode() {
  this.word = null
  this.children = new Array(26)
}

const codeA = 'a'.codePointAt(0)

/**
 * @param {string[]} words
 * @return {string}
 */
const longestWord = words => {
  const root = new TrieNode()
  const trieInsert = word => {
    let cur = root
    for (let i = 0; i < word.length; ++i) {
      const ch = word.codePointAt(i) - codeA
      if (ch in cur.children) {
        cur = cur.children[ch]
      } else {
        const newNode = new TrieNode()
        cur.children[ch] = newNode
        cur = newNode
      }
    }
    cur.word = word
  }

  for (let i = 0; i < words.length; ++i) {
    trieInsert(words[i])
  }

  let ans = null
  const search = cur => {
    if (cur.word === null)
      return
    if (cur.children.every(node => node.word === null)) {
      if (ans === null || ans.length < cur.word.length)
        ans = cur.word
    } else {
      cur.children.forEach(node => search(node))
    }
  }
  root.children.forEach(search)
  return ans
}

const {cTestFunc} = require('leetcode-zwischenzug')
const f = cTestFunc(longestWord)

f(["w","wo","wor","worl", "world"])("world")
f(["a", "banana", "app", "appl", "ap", "apply", "apple"])("apple")
