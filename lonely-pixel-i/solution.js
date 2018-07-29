/**
 * @param {character[][]} picture
 * @return {number}
 */
const findLonelyPixel = img => {
  /*
     idea: solve 1d problem for rows and cols,
     once this is done, 2d lonely pixels
     are those that occupied an otherwise empty row and col,
     which is the intersection of both 1d solution.
     so we just take min of them
   */
  const rows = img.length
  if (rows === 0)
    return 0
  const cols = img[0].length
  if (cols === 0)
    return 0
  const rowCounts = new Uint16Array(rows)
  const colCounts = new Uint16Array(cols)
  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      if (img[i][j] === 'B') {
        ++rowCounts[i]
        ++colCounts[j]
      }
    }
  }
  const g = (acc, cnt) =>
    cnt === 1 ? acc + 1 : acc
  return Math.min(
    rowCounts.reduce(g, 0),
    colCounts.reduce(g, 0)
  )
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(findLonelyPixel)

f([
  ['W', 'W', 'B'],
  ['W', 'B', 'W'],
  ['B', 'W', 'W']
])(3)
f([
  ['W', 'W', 'B', 'W'],
  ['W', 'B', 'W', 'B'],
  ['B', 'W', 'W', 'B']
])(1)
f([
  ['W', 'W', 'B', 'W'],
  ['W', 'B', 'W', 'W'],
  ['B', 'W', 'W', 'B']
])(2)
f([
  ['W', 'W', 'B', 'W'],
  ['W', 'B', 'W', 'W'],
  ['W', 'W', 'B', 'W']
])(1)
f([
  ['W', 'W', 'B', 'W'],
  ['W', 'B', 'W', 'W'],
  ['W', 'W', 'B', 'W'],
  ['W', 'B', 'W', 'W']
])(0)
f([
  ["W","B","B","B","W","W","B","W","W","B"],
  ["W","W","W","W","W","W","W","B","W","W"],
  ["W","B","B","W","W","W","B","B","W","B"],
  ["B","B","B","B","W","B","W","B","W","B"],
  ["W","W","B","B","B","W","B","W","W","B"],
  ["B","W","W","B","B","W","W","W","W","W"],
  ["B","W","B","W","W","B","W","B","B","W"],
  ["B","B","B","B","W","W","W","B","B","W"]
])(0)
