const allCandidates = new Set([1,2,3,4,5,6,7,8,9])

/*
   groups of cells that has to contain mutually exclusive nums
   - 0~8: all rows
   - 9~17: all cols
   - 18~26: all boxes
   - all groups will contain exactly 9 elements
 */
const meGroups = new Array(27)
// make cell coords to group indices
const coordToGroupInds = new Array(9)
for (let i = 0; i < 9; ++i) {
  coordToGroupInds[i] = new Array(9)
  for (let j = 0; j < 9; ++j) {
    coordToGroupInds[i][j] = []
  }
}

for (let i = 0; i < 9; ++i) {
  meGroups[i] = new Array(9)
  meGroups[i+9] = new Array(9)
  for (let j = 0; j < 9; ++j) {
    meGroups[i][j] = {r:i, c:j}
    coordToGroupInds[i][j].push(i)
    meGroups[i+9][j] = {r:j, c:i}
    coordToGroupInds[j][i].push(i+9)
  }
}
{
  let ind = 18
  for (let i = 0; i < 9; i += 3) {
    for (let j = 0; j < 9; j += 3) {
      const grp = []
      for (let dx = 0; dx < 3; ++dx) {
        for (let dy = 0; dy < 3; ++dy) {
          const r = i+dx, c = j+dy
          grp.push({r,c})
          coordToGroupInds[r][c].push(ind)
        }
      }
      meGroups[ind] = grp
      ++ind
    }
  }
}

const copyBoard = board => {
  const ret = new Array(9)
  for (let i = 0; i < 9; ++i) {
    ret[i] = new Array(9)
    for (let j = 0; j < 9; ++j) {
      if (typeof board[i][j] === 'number') {
        ret[i][j] = board[i][j]
      } else {
        ret[i][j] = new Set(board[i][j])
      }
    }
  }
  return ret
}

/*
   try to eliminate candidates and report results:
   - if return value is `null`, input board is impossible to solve
   - otherwise return value is {solved: <boolean>, board}
   - a solved board is simply a board whose all elements are numbers
 */
const improveBoard = inpBoard => {
  const board = copyBoard(inpBoard)
  const scheFlag = new Uint8Array(81)
  const queue = []
  let qSize = 0, qFirst = 0
  const enqueue = coord => {
    const {r,c} = coord
    const offset = r*9+c
    if (!scheFlag[offset]) {
      scheFlag[offset] = 1
      queue[qSize] = coord
      ++qSize
    }
  }
  const attack = (r,c) => {
    if (typeof board[r][c] === 'number') {
      const num = board[r][c]
      coordToGroupInds[r][c].forEach(eGrpInd =>
        meGroups[eGrpInd].forEach(coord => {
          const {r:r1, c:c1} = coord
          if (board[r1][c1] instanceof Set) {
            if (board[r1][c1].has(num)) {
              board[r1][c1].delete(num)
              enqueue(coord)
            }
          }
        })
      )
      return true
    } else {
      // board[r][c] is a Set
      const s = board[r][c]
      if (s.size === 0)
        return false
      if (s.size === 1) {
        board[r][c] = [...s][0]
        return attack(r,c)
      }
      return true
    }
  }
  for (let i = 0; i < 9; ++i) {
    for (let j = 0; j < 9; ++j) {
      if (!attack(i,j))
        return null
    }
  }
  while (qFirst < qSize) {
    const {r,c} = queue[qFirst]
    scheFlag[r*9+c] = 0
    ++qFirst
    if (!attack(r,c))
      return null
  }
  console.log(board)
}

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
const solveSudoku = rawBoard => {
  // board[i][j] = 1~9 or a set of candidates
  const initBoard = new Array(9)
  for (let i = 0; i < 9; ++i) {
    initBoard[i] = new Array(9)
    for (let j = 0; j < 9; ++j) {
      if (rawBoard[i][j] === '.') {
        initBoard[i][j] = new Set(allCandidates)
      } else {
        initBoard[i][j] = Number(rawBoard[i][j])
      }
    }
  }
  console.log(improveBoard(initBoard))
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(solveSudoku)
f([
  ["5","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"],
])()
