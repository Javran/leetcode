function QNode(word) {
  this.word = word
  this.next = null
}

function TNode(word) {
  this.word = word
  this.children = new Array(26)
}

const codeAtoZ = 'abcdefghijklmnopqrstuvwxyz'
const codeA = codeAtoZ.codePointAt(0)

/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {string[][]}
 */
const findLadders = (beginWord, endWord, wordList) => {
  /*
     idea: use BFS to build up the graph from beginWord to endWord,
     we don't return immediately after a path is found,
     instead, allow queue to exhaust (for this we need to make sure that
     we don't enqueue any more words past endWord) and this
     gives us the traces from endWord all the way back to beginWord.
     and the paths can be recovered with a recursive approach.

     for nextWords, we can build up a trie and search the word
     as if we allow one place to be wildcard - this approach
     is faster than trying 'a' ~ 'z' for every position in a Set,
     as we never try a word that is not in the wordList by using Trie.
   */
  const tRoot = new TNode(null)
  const trieInsert = word => {
    let cur = tRoot
    for (let i = 0; i < word.length; ++i) {
      const ch = word.codePointAt(i) - codeA
      if (ch in cur.children) {
        cur = cur.children[ch]
      } else {
        const newNode = new TNode(null)
        cur.children[ch] = newNode
        cur = newNode
      }
    }
    cur.word = word
  }
  wordList.forEach(trieInsert)
  // maskInd for the one ind which no comparison happens
  const searchWithWildcard = (word, maskInd, out) => {
    const search = (cur, i) => {
      if (i === word.length) {
        out.push(cur.word)
        return
      }
      if (i === maskInd) {
        cur.children.forEach(node => search(node, i+1))
      } else {
        const ch = word.codePointAt(i) - codeA
        if (ch in cur.children)
          search(cur.children[ch], i+1)
      }
    }
    return search
  }

  // note that the resulting list will contain "word"
  // itself, but as we are doing BFS, `track[w]` has the property
  // that if `w` is present, it has to be the best solution,
  // so we are fine because current word can never be enqueued again.
  const nextWords = word => {
    const ret = []
    for (let i = 0; i < word.length; ++i) {
      searchWithWildcard(word, i, ret)(tRoot, 0)
    }
    return ret
  }

  // track[word] = {dist: int, prevs: Array<string>}
  const track = new Map()
  track.set(beginWord, {dist: 0, prevs: []})
  let qHead = new QNode(beginWord, 0)
  let qTail = qHead
  let ansDist = null
  while (qHead !== null) {
    const {word} = qHead
    const {dist, prevs} = track.get(word)
    if (ansDist === null && endWord === word) {
      ansDist = dist
    }
    const nextDist = dist + 1
    if (ansDist === null || nextDist <= ansDist) {
      const ws = nextWords(word)
      ws.forEach(nextWord => {
        if (track.has(nextWord)) {
          const nextInfo = track.get(nextWord)
          if (nextInfo.dist === nextDist) {
            nextInfo.prevs.push(word)
          }
        } else {
          track.set(nextWord, {dist: nextDist, prevs: [word]})
          qTail.next = new QNode(nextWord)
          qTail = qTail.next
        }
      })
    }
    qHead = qHead.next
  }
  if (ansDist === null) {
    return []
  }
  const ans = []
  const curPath = new Array(ansDist+1)
  const buildPath = (word, ind) => {
    const tr = track.get(word)
    curPath[ind] = word
    if (word === beginWord) {
      ans.push(curPath.slice(0, ansDist+1))
    } else {
      tr.prevs.forEach(prevWord => {
        buildPath(prevWord, ind-1)
      })
    }
  }
  buildPath(endWord, ansDist)
  return ans
}

const {cTestFunc} = require('leetcode-zwischenzug')
const f = cTestFunc(findLadders)

f("hit", "cog", ["hot","dot","dog","lot","log","cog"])()
f("hit", "cog", ["hot","dot","dog","lot","log"])([])
