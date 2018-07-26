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

   */
  if (word === '')
    // vacuously true
    return true
  const rows = board.length
  if (rows === 0)
    return false
  const cols = board[0].length
  if (cols === 0)
    return false
  let found = false
  const visited = new Set()
  const search = (r,c,dep) => {
    if (dep === word.length) {
      found = true
      return
    }
    for (let i = 0; i < 4 && !found; ++i) {
      const [dr,dc] = dirs[i]
      const r1 = r + dr, c1 = c + dc
      if (
        r1 >= 0 && r1 < rows && c1 >= 0 && c1 < cols &&
	    board[r1][c1] === word[dep]
      ) {
        const key = `${r1},${c1}`
        if (!(visited.has(key))) {
          visited.add(key)
          search(r1,c1,dep+1)
          visited.delete(key)
        }
      }
    }
  }
  for (let r = 0; r < rows && !found; ++r) {
    for (let c = 0; c < cols && !found; ++c) {
      if (board[r][c] === word[0]) {
        const key = `${r},${c}`
        visited.add(key)
        search(r,c,1)
        visited.delete(key)
      }
    }
  }
  return found
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(exist)

f([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCCED")(true)
f([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ASAFBCC")(false)
f([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ASABFCC")(true)
f([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "SEE")(true)
