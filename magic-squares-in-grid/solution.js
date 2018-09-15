const gridDs = [
  [ [0,0], [0,1], [0,2] ],
  [ [1,0], [1,1], [1,2] ],
  [ [2,0], [2,1], [2,2] ],

  [ [0,0], [1,0], [2,0] ],
  [ [0,1], [1,1], [2,1] ],
  [ [0,2], [1,2], [2,2] ],

  [ [0,0], [1,1], [2,2] ],
  [ [2,0], [1,1], [0,2] ],
]

/**
 * @param {number[][]} grid
 * @return {number}
 */
const numMagicSquaresInside = grid => {
  /*
     idea: straightforward test.
   */
  const rows = grid.length
  if (rows <= 2)
    return 0
  const cols = grid[0].length
  if (cols <= 2)
    return 0
  let ans = 0
  const testMagic = (x,y) => {
    let flags = 0
    for (let i = 0; i < 3; ++i) {
      for (let j = 0; j < 3; ++j) {
        flags |= (1 << grid[x+i][y+j])
      }
    }
    if (flags !== 0b1111111110)
      return false
    const getSum = coords => coords.reduce((acc, [dx,dy]) => acc + grid[x+dx][y+dy], 0)
    const sum = getSum(gridDs[0])
    return gridDs.every(coords => getSum(coords) === sum)
  }
  for (let i = 0; i+2 < rows; ++i) {
    for (let j = 0; j+2 < cols; ++j) {
      if (testMagic(i,j))
        ++ans
    }
  }
  return ans
}

const {cTestFunc} = require('leetcode-zwischenzug')
const f = cTestFunc(numMagicSquaresInside)
f([
  [4,3,8,4],
  [9,5,1,9],
  [2,7,6,2]
])(1)
