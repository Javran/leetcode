const setBound = 0b1000000000
const isSet = x => x >= setBound
const allCandidates = setBound | 0b111111111
const mkSingleton = num => setBound | (1 << (num-1))
const getSingleton = setRep => {
  for (let num = 1; num <= 9; ++num) {
    if (mkSingleton(num) === setRep)
      return num
  }
  return null
}
const toNums = setRep => {
  let ret = []
  for (let num = 1; num <= 9; ++num) {
    if (setRep & (1 << (num-1)))
      ret.push(num)
  }
  return ret
}

/*
   groups of cells that has to contain mutually exclusive nums
   - 0~8: all rows
   - 9~17: all cols
   - 18~26: all boxes
   - all groups will contain exactly 9 elements
 */
const meGroups = [
  [{r:0,c:0},{r:0,c:1},{r:0,c:2},{r:0,c:3},{r:0,c:4},{r:0,c:5},{r:0,c:6},{r:0,c:7},{r:0,c:8}],
  [{r:1,c:0},{r:1,c:1},{r:1,c:2},{r:1,c:3},{r:1,c:4},{r:1,c:5},{r:1,c:6},{r:1,c:7},{r:1,c:8}],
  [{r:2,c:0},{r:2,c:1},{r:2,c:2},{r:2,c:3},{r:2,c:4},{r:2,c:5},{r:2,c:6},{r:2,c:7},{r:2,c:8}],
  [{r:3,c:0},{r:3,c:1},{r:3,c:2},{r:3,c:3},{r:3,c:4},{r:3,c:5},{r:3,c:6},{r:3,c:7},{r:3,c:8}],
  [{r:4,c:0},{r:4,c:1},{r:4,c:2},{r:4,c:3},{r:4,c:4},{r:4,c:5},{r:4,c:6},{r:4,c:7},{r:4,c:8}],
  [{r:5,c:0},{r:5,c:1},{r:5,c:2},{r:5,c:3},{r:5,c:4},{r:5,c:5},{r:5,c:6},{r:5,c:7},{r:5,c:8}],
  [{r:6,c:0},{r:6,c:1},{r:6,c:2},{r:6,c:3},{r:6,c:4},{r:6,c:5},{r:6,c:6},{r:6,c:7},{r:6,c:8}],
  [{r:7,c:0},{r:7,c:1},{r:7,c:2},{r:7,c:3},{r:7,c:4},{r:7,c:5},{r:7,c:6},{r:7,c:7},{r:7,c:8}],
  [{r:8,c:0},{r:8,c:1},{r:8,c:2},{r:8,c:3},{r:8,c:4},{r:8,c:5},{r:8,c:6},{r:8,c:7},{r:8,c:8}],
  [{r:0,c:0},{r:1,c:0},{r:2,c:0},{r:3,c:0},{r:4,c:0},{r:5,c:0},{r:6,c:0},{r:7,c:0},{r:8,c:0}],
  [{r:0,c:1},{r:1,c:1},{r:2,c:1},{r:3,c:1},{r:4,c:1},{r:5,c:1},{r:6,c:1},{r:7,c:1},{r:8,c:1}],
  [{r:0,c:2},{r:1,c:2},{r:2,c:2},{r:3,c:2},{r:4,c:2},{r:5,c:2},{r:6,c:2},{r:7,c:2},{r:8,c:2}],
  [{r:0,c:3},{r:1,c:3},{r:2,c:3},{r:3,c:3},{r:4,c:3},{r:5,c:3},{r:6,c:3},{r:7,c:3},{r:8,c:3}],
  [{r:0,c:4},{r:1,c:4},{r:2,c:4},{r:3,c:4},{r:4,c:4},{r:5,c:4},{r:6,c:4},{r:7,c:4},{r:8,c:4}],
  [{r:0,c:5},{r:1,c:5},{r:2,c:5},{r:3,c:5},{r:4,c:5},{r:5,c:5},{r:6,c:5},{r:7,c:5},{r:8,c:5}],
  [{r:0,c:6},{r:1,c:6},{r:2,c:6},{r:3,c:6},{r:4,c:6},{r:5,c:6},{r:6,c:6},{r:7,c:6},{r:8,c:6}],
  [{r:0,c:7},{r:1,c:7},{r:2,c:7},{r:3,c:7},{r:4,c:7},{r:5,c:7},{r:6,c:7},{r:7,c:7},{r:8,c:7}],
  [{r:0,c:8},{r:1,c:8},{r:2,c:8},{r:3,c:8},{r:4,c:8},{r:5,c:8},{r:6,c:8},{r:7,c:8},{r:8,c:8}],
  [{r:0,c:0},{r:0,c:1},{r:0,c:2},{r:1,c:0},{r:1,c:1},{r:1,c:2},{r:2,c:0},{r:2,c:1},{r:2,c:2}],
  [{r:0,c:3},{r:0,c:4},{r:0,c:5},{r:1,c:3},{r:1,c:4},{r:1,c:5},{r:2,c:3},{r:2,c:4},{r:2,c:5}],
  [{r:0,c:6},{r:0,c:7},{r:0,c:8},{r:1,c:6},{r:1,c:7},{r:1,c:8},{r:2,c:6},{r:2,c:7},{r:2,c:8}],
  [{r:3,c:0},{r:3,c:1},{r:3,c:2},{r:4,c:0},{r:4,c:1},{r:4,c:2},{r:5,c:0},{r:5,c:1},{r:5,c:2}],
  [{r:3,c:3},{r:3,c:4},{r:3,c:5},{r:4,c:3},{r:4,c:4},{r:4,c:5},{r:5,c:3},{r:5,c:4},{r:5,c:5}],
  [{r:3,c:6},{r:3,c:7},{r:3,c:8},{r:4,c:6},{r:4,c:7},{r:4,c:8},{r:5,c:6},{r:5,c:7},{r:5,c:8}],
  [{r:6,c:0},{r:6,c:1},{r:6,c:2},{r:7,c:0},{r:7,c:1},{r:7,c:2},{r:8,c:0},{r:8,c:1},{r:8,c:2}],
  [{r:6,c:3},{r:6,c:4},{r:6,c:5},{r:7,c:3},{r:7,c:4},{r:7,c:5},{r:8,c:3},{r:8,c:4},{r:8,c:5}],
  [{r:6,c:6},{r:6,c:7},{r:6,c:8},{r:7,c:6},{r:7,c:7},{r:7,c:8},{r:8,c:6},{r:8,c:7},{r:8,c:8}],
]

const coordToGroupInds = [
  [[0,9,18],[0,10,18],[0,11,18],[0,12,19],[0,13,19],[0,14,19],[0,15,20],[0,16,20],[0,17,20]],
  [[9,1,18],[1,10,18],[1,11,18],[1,12,19],[1,13,19],[1,14,19],[1,15,20],[1,16,20],[1,17,20]],
  [[9,2,18],[10,2,18],[2,11,18],[2,12,19],[2,13,19],[2,14,19],[2,15,20],[2,16,20],[2,17,20]],
  [[9,3,21],[10,3,21],[11,3,21],[3,12,22],[3,13,22],[3,14,22],[3,15,23],[3,16,23],[3,17,23]],
  [[9,4,21],[10,4,21],[11,4,21],[12,4,22],[4,13,22],[4,14,22],[4,15,23],[4,16,23],[4,17,23]],
  [[9,5,21],[10,5,21],[11,5,21],[12,5,22],[13,5,22],[5,14,22],[5,15,23],[5,16,23],[5,17,23]],
  [[9,6,24],[10,6,24],[11,6,24],[12,6,25],[13,6,25],[14,6,25],[6,15,26],[6,16,26],[6,17,26]],
  [[9,7,24],[10,7,24],[11,7,24],[12,7,25],[13,7,25],[14,7,25],[15,7,26],[7,16,26],[7,17,26]],
  [[9,8,24],[10,8,24],[11,8,24],[12,8,25],[13,8,25],[14,8,25],[15,8,26],[16,8,26],[8,17,26]],
]

const copyBoard = board => {
  const ret = new Array(9)
  for (let i = 0; i < 9; ++i) {
    ret[i] = board[i].slice()
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
  /*
     `attack` try to use current cell to remove
     candidates from other cells.
     should any deletion happens to other cells,
     those cells will be enqueued for further "attacking".

     this function returns false if and only if current cell has no candidate,
     in which case this cannot be a solution so we can abort any further search along this branch

     p.s. I call it "attack" simply because it looks like a queen
     attacking her row, col and surrounding cells
     (box rather than diagonal in this case).
   */
  const attack = (r,c) => {
    if (isSet(board[r][c])) {
      // board[r][c] is a Set
      const s = board[r][c]
      if (/* s.size === 0 */ s === setBound)
        return false
      const maybeNum = getSingleton(s)
      if (/* s.size === 1 */ maybeNum !== null) {
        board[r][c] = maybeNum
        return attack(r,c)
      }
      return true
    } else {
      const num = board[r][c]
      const sg = mkSingleton(num)
      coordToGroupInds[r][c].forEach(eGrpInd =>
        meGroups[eGrpInd].forEach(coord => {
          const {r:r1, c:c1} = coord
          if (sg === (sg & board[r1][c1])) {
            board[r1][c1] ^= 1 << (num - 1)
            enqueue(coord)
          }
        })
      )
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
  return {
    board,
    solved: board.every(r => !r.some(v => isSet(v))),
  }
}

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
const solveSudoku = rawBoard => {
  /*
     idea: maintain cell candidates and fixpoint it.
   */
  // board[i][j] = 1~9 or a set of candidates
  let initBoard = new Array(9)
  for (let i = 0; i < 9; ++i) {
    initBoard[i] = new Uint16Array(9)
    for (let j = 0; j < 9; ++j) {
      if (rawBoard[i][j] === '.') {
        initBoard[i][j] = allCandidates
      } else {
        initBoard[i][j] = Number(rawBoard[i][j])
      }
    }
  }
  let ans = null
  const ret = improveBoard(initBoard)
  if (ret.solved) {
    ans = ret.board
  } else {
    // invariant: input board must be an improved board
    // (an improved board won't have cells whose size of candidate list are less than 2)
    const search = board => {
      let bestCell = null
      let candidates = null
      /*
         to reduce branching factor, at each layer of the search,
         we only try the cell with least amount of candidates.
       */
      for (let i = 0; i < 9; ++i) {
        for (let j = 0; j < 9; ++j) {
          if (isSet(board[i][j])) {
            const cs = toNums(board[i][j])
            if (candidates === null || cs.length < candidates.length) {
              candidates = cs
              bestCell = {r:i, c:j}
            }
          }
        }
      }
      if (bestCell !== null) {
        const {r,c} = bestCell
        for (let k = 0; k < candidates.length; ++k) {
          const newBoard = copyBoard(board)
          newBoard[r][c] = candidates[k]
          const ret = improveBoard(newBoard)
          if (ret !== null) {
            if (ret.solved) {
              ans = ret.board
              return
            }
            search(ret.board)
            if (ans !== null)
              return
          }
        }
      }
    }
    search(ret.board)
  }
  for (let i = 0; i < 9; ++i) {
    for (let j = 0; j < 9; ++j) {
      if (rawBoard[i][j] === '.')
        rawBoard[i][j] = String(ans[i][j])
    }
  }
  return
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
f([
  "5.46.37..",
  "1...745.3",
  ".3785.2..",
  ".4.36.97.",
  "3..78....",
  ".75.42.3.",
  "..3.98.5.",
  "4.653...9",
  "..9..6..7",
].map(x => x.split("")))()
f([
  [".",".","9","7","4","8",".",".","."],
  ["7",".",".",".",".",".",".",".","."],
  [".","2",".","1",".","9",".",".","."],
  [".",".","7",".",".",".","2","4","."],
  [".","6","4",".","1",".","5","9","."],
  [".","9","8",".",".",".","3",".","."],
  [".",".",".","8",".","3",".","2","."],
  [".",".",".",".",".",".",".",".","6"],
  [".",".",".","2","7","5","9",".","."]
])()
f([
  [".",".",".","2",".",".",".","6","3"],
  ["3",".",".",".",".","5","4",".","1"],
  [".",".","1",".",".","3","9","8","."],
  [".",".",".",".",".",".",".","9","."],
  [".",".",".","5","3","8",".",".","."],
  [".","3",".",".",".",".",".",".","."],
  [".","2","6","3",".",".","5",".","."],
  ["5",".","3","7",".",".",".",".","8"],
  ["4","7",".",".",".","1",".",".","."],
])()

/*
// for generating meGroups and coordToGroupInds
const genTable = () => {
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
  console.log(`meGroups = ${JSON.stringify(meGroups)}`)
  console.log(`coordToGroupInds = ${JSON.stringify(coordToGroupInds)}`)
}

genTable()
*/
