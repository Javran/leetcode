function TNode() {
  this.word = null
  this.children = new Array(26)
}

const codeA = 'a'.codePointAt(0)
/*
   normally we'll build a "visited" structure to tell that
   some cells have been used so we shouldn't go to it,
   but we can do the actual masking directly on board.
 */
const mask = 0x7f

/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
const findWords = (rawBoard, words) => {
  const rows = rawBoard.length
  if (rows === 0)
    return []
  const cols = rawBoard[0].length
  if (cols === 0)
    return []
  /*
     idea: use trie to represent the set of words,
     therefore we can maximize the use of search context
     to achieve better performance than perform searches individually.

     e.g. words like "ab", "abc", "abcde", which share the same prefix,
     can all reuse search results of "ab", etc.

   */
  const ans = new Set()
  /*
     I have to make an assumption for now:

     - `words` does not have duplicate words

   */
  const trieRoot = new TNode()
  const trieInsert = (root, word, ind) => {
    const code = word.codePointAt(ind) - codeA
    if (ind === word.length) {
      root.word = word
      return
    } else {
      if (!root.children[code]) {
        root.children[code] = new TNode()
      }
      return trieInsert(root.children[code], word, ind+1)
    }
  }

  // build up trie of words
  words.forEach(w => {
    if (w.length !== 0) {
      trieInsert(trieRoot, w, 0)
    } else {
      ans.add('')
    }
  })

  // since we'll need to search through this matrix quite a lot,
  // let's preprocess the actual "letter code" that allows faster access
  const board = new Array(rows)
  for (let i = 0; i < rows; ++i) {
    board[i] = new Uint8Array(cols)
    for (let j = 0; j < cols; ++j) {
      board[i][j] = rawBoard[i][j].codePointAt(0) - codeA
    }
  }

  const search = (curRoot, r, c) => {
    if (curRoot.word !== null) {
      ans.add(curRoot.word)
    }
    const trySearch = (r1, c1) => {
      if (board[r1][c1] !== mask) {
        const code = board[r1][c1]
        const nextNode = curRoot.children[code]
        if (nextNode) {
          board[r1][c1] = mask
          search(nextNode, r1, c1)
          board[r1][c1] = code
        }
      }
    }
    if (r > 0)
      trySearch(r-1, c)
    if (r+1 < rows)
      trySearch(r+1, c)
    if (c > 0)
      trySearch(r, c-1)
    if (c+1 < cols)
      trySearch(r, c+1)
  }

  for (let i = 0; i < rows; ++i)
    for (let j = 0; j < cols; ++j) {
      const code = board[i][j]
      const nextNode = trieRoot.children[code]
      if (nextNode) {
        board[i][j] = mask
        search(nextNode, i, j)
        board[i][j] = code
      }
    }

  return [...ans]
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(findWords)
f([["a"]], ["a"])(["a"])
f(
  [
    ["o","a","a","n"],
    ["e","t","a","e"],
    ["i","h","k","r"],
    ["i","f","l","v"]
  ],
  ["oath","pea","eat","rain"]
)(["oath","eat"])

