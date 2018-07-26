const dirs = [[-1,0], [1,0], [0,-1], [0,1]]

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
const exist = (board, word) => {
  /*
     idea: standard DFS.

     in case there are boards fully filled with same character,
     which does not work well with BFS and I didn't find an easy
     to rule out duplicated states (for a particular path,
     all of its visited cells matters when determining where to go next)

     optimize: since we only need to find one solution
     and it seems that destructively modifying input is okay,
     we can let function return at the first available moment.

   */
  if (word === '')
    // vacuously true
    return true
  const rows = board.length
  const cols = board[0].length
  const search = (r,c,dep) => {
    if (dep === word.length) {
      return true
    }
    const wCode = word.codePointAt(dep)
    for (let i = 0; i < 4; ++i) {
      const [dr,dc] = dirs[i]
      const r1 = r + dr, c1 = c + dc
      if (
        r1 >= 0 && r1 < rows && c1 >= 0 && c1 < cols &&
	    board[r1][c1].codePointAt(0) === wCode
      ) {
        const tmp = board[r1][c1]
        board[r1][c1] = ''
        if (search(r1,c1,dep+1))
          return true
        board[r1][c1] = tmp
      }
    }
    return false
  }
  for (let r = 0; r < rows; ++r) {
    for (let c = 0; c < cols; ++c) {
      if (board[r][c] === word[0]) {
        const tmp = board[r][c]
        board[r][c] = ''
        if (search(r,c,1))
          return true
        board[r][c] = tmp
      }
    }
  }
  return false
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(exist)

f([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCCED")(true)
f([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ASAFBCC")(false)
f([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ASABFCC")(true)
f([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "SEE")(true)
