const codeA = 'a'.codePointAt(0)

function TrieNode() {
  this.word = null
  this.children = new Array(26).fill(null)
}

/**
 * @param {string[]} dict
 * @param {string} sentence
 * @return {string}
 */
const replaceWords = (dict, sentence) => {
  const root = new TrieNode()
  const trieInsert = w => {
    const lMax = w.length-1
    const f = (tNode, i) => {
      const code = w.codePointAt(i) - codeA
      if (tNode.children[code] === null) {
        tNode.children[code] = new TrieNode()
      }
      if (i === lMax) {
        tNode.children[code].word = w
      } else {
        f(tNode.children[code], i+1)
      }
    }
    return f
  }
  for (let i = 0; i < dict.length; ++i) {
    const w = dict[i]
    if (w.length > 0) {
      trieInsert(w)(root, 0)
    }
  }
  const tr = word => {
    let cur = root, i = 0
    while (cur.word === null && i < word.length) {
      const code = word.codePointAt(i) - codeA
      if (cur.children[code] === null)
        break
      cur = cur.children[code]
      ++i
    }
    return (cur.word === null ? word : cur.word)
  }
  return sentence.split(' ').map(tr).join(' ')
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(replaceWords)
f(["cat", "bat", "rat"], "the cattle was rattled by the battery")("the cat was rat by the bat")
