/**
 * @param {character[][]} picture
 * @return {number}
 */
const findLonelyPixel = img => {
  const rows = img.length
  if (rows === 0)
    return 0
  const cols = img[0].length
  if (cols === 0)
    return 0
  const colSets = new Array(cols)
  // scan every row looking for lonely black pixels
  for (let i = 0; i < rows; ++i) {
    let j = 0
    while (j < cols && img[i][j] === 'W')
      ++j
    if (j < cols) {
      let good = true
      // img[i][j] === 'B'
      for (let k = j+1; good && k < cols; ++k) {
        if (img[i][k] === 'B')
          good = false
      }
      if (good) {
        // try recording i,j
        if (!(j in colSets)) {
          colSets[j] = j
        } else {
          // wipe old result as if it's removed
          // but setting it to false still keep the index occupied
          colSets[j] = false
        }
      }
    }
  }
  return colSets.reduce((acc, colIndOrFalse) => {
    if (colIndOrFalse !== false) {
      let count = 0
      for (let i = 0; count <= 1 && i < rows; ++i) {
        if (img[i][colIndOrFalse] === 'B')
          ++count
      }
      if (count === 1)
        ++acc
    }
    return acc
  }, 0)
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
