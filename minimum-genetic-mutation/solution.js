const getInd = (str, i) => {
  const code = str.codePointAt(i)
  return code === 65 /* A */ ? 0 :
    code === 67 /* C */ ? 1 :
    code === 71 /* G */ ? 2 :
    code === 84 /* T */? 3 :
    (() => {throw `invalid char: ${str[i]}`})()
}

function TrieNode(word) {
  this.word = word
  this.children = [null, null, null, null]
}

function QNode(word, dep) {
  this.word = word
  this.dep = dep
  this.next = null
}

/**
 * @param {string} start
 * @param {string} end
 * @param {string[]} bank
 * @return {number}
 */
const minMutation = (start, end, bank) => {
  // eliminate obvious cases first
  if (start === end)
    return 0
  if (!bank.includes(end))
    return -1

  /*
     idea: we build a trie to contain all genes in the bank
     (start gene could be included but it should not be necessary)
     this allows us to obtain genes with exactly one "wildcard place".

     then we use this in function `nexts` to figure out what is
     the next possible gene available.

     after all these are done, a BFS completes the algorithm
   */

  const tRoot = new TrieNode(null)
  // assuming word.length > 0
  const trieInsert = word => {
    let tCur = tRoot
    for (let i = 0; i < word.length; ++i) {
      const gene = getInd(word, i)
      if (tCur.children[gene] === null) {
        tCur.children[gene] = new TrieNode(null)
      }
      tCur = tCur.children[gene]
    }
    tCur.word = word
  }

  for (let i = 0; i < bank.length; ++i)
    trieInsert(bank[i])

  const nexts = word => {
    const retSet = new Set()
    const collect = wildInd => {
      // wildInd is the wildcard index
      const collectAux = (tCur, ind) => {
        if (tCur === null)
          return
        if (ind === word.length) {
          if (tCur.word !== null)
            retSet.add(tCur.word)
          return
        }

        if (ind === wildInd) {
          for (let j = 0; j < tCur.children.length; ++j) {
            collectAux(tCur.children[j], ind+1)
          }
        } else {
          const gene = getInd(word, ind)
          collectAux(tCur.children[gene], ind+1)
        }
      }
      return collectAux
    }

    for (let i = 0; i < word.length; ++i) {
      collect(i)(tRoot, 0)
    }
    retSet.delete(word)
    return [...retSet]
  }

  let qHead = new QNode(start, 0)
  let qTail = qHead
  const visited = new Set()
  visited.add(start)

  while (qHead !== null) {
    const {word, dep} = qHead
    if (word === end)
      return dep
    const nextWords = nexts(word)
    const nextDep = dep+1

    for (let i = 0; i < nextWords.length; ++i) {
      const nWord = nextWords[i]
      if (visited.has(nWord))
        continue
      visited.add(nWord)
      qTail.next = new QNode(nWord, nextDep)
      qTail = qTail.next
    }
    qHead = qHead.next
  }

  return -1
}

const {cTestFunc} = require('leetcode-zwischenzug')
const f = cTestFunc(minMutation)

f("AACCGGTT", "AACCGGTA", ["AACCGGTA"])(1)
f("AACCGGTT", "AAACGGTA", ["AACCGGTA", "AACCGCTA", "AAACGGTA"])(2)
f("AAAAACCC", "AACCCCCC", ["AAAACCCC", "AAACCCCC", "AACCCCCC"])(3)
