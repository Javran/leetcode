function QNode(word) {
  this.word = word
  this.next = null
}

const codeAtoZ = 'abcdefghijklmnopqrstuvwxyz'

/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {string[][]}
 */
const findLadders = (beginWord, endWord, wordList) => {
  const words = new Set(wordList)
  const nextWords = word => {
    const ret = []
    for (let i = 0; i < word.length; ++i) {
      for (let j = 0; j < codeAtoZ.length; ++j) {
        const nextWord = [word.substring(0,i), codeAtoZ[j], word.substring(i+1)].join('')
        if (nextWord !== word && words.has(nextWord)) {
          ret.push(nextWord)
        }
      }
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
