/**
 * @param {character[][]} image
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
const minArea = (img, xInp, yInp) => {
  // as we are guaranteed to get one black region,
  // there is no need of checking (=== 0)s
  const rows = img.length
  const cols = img[0].length

  /*
     idea: project to x-axis and y-axis, solve the 1d problem
     using binary search (as we've known one point as starting point)
     and put results together
   */

  /*
     binary search a cutting position i, in which condL(i) && condR(i)
     is satisfied.
     we need result from condL and condR separately to allow us
     to guide to the correct half of our search space.
     note that since we are talking about a cutting position,
     l and r can range from [0..N] inclusive where N is either rows or cols
   */
  const binarySearch = (l, r, condL, condR) => {
    while (l <= r) {
      const mid = (l + r) >> 1
      const resultL = condL(mid)
      const resultR = condR(mid)
      if (resultL && resultR) {
        return mid
      } else if (resultL) {
        l = mid + 1
      } else {
        r = mid - 1
      }
    }
  }
  /*
     rowOccupied & colOccupied are used to tell whether
     certain row or col has black pixels somewhere.
     could do memoize, but since in binarySearch
     we call with each distinct input only once, there
     is no need over-optimizing these 2 functions.
   */
  const rowOccupied = row => {
    for (let c = 0; c < cols; ++c)
      if (img[row][c] === '1')
        return true
    return false
  }
  const colOccupied = col => {
    for (let r = 0; r < rows; ++r)
      if (img[r][col] === '1')
        return true
    return false
  }

  const xMin = binarySearch(
    0, xInp,
    i => i - 1 < 0 || !rowOccupied(i-1),
    i => i < rows && rowOccupied(i)
  )

  const xMax = binarySearch(
    xInp+1, rows,
    i => i - 1 >= 0 && rowOccupied(i-1),
    i => i >= rows || !rowOccupied(i)
  )

  const yMin = binarySearch(
    0, yInp,
    i => i - 1 < 0 || !colOccupied(i-1),
    i => i < cols && colOccupied(i)
  )

  const yMax = binarySearch(
    yInp+1, cols,
    i => i - 1 >= 0 && colOccupied(i-1),
    i => i >= cols || !colOccupied(i)
  )

  return (xMax - xMin) * (yMax - yMin)
}

const tr = s => s.map(x => x.split(''))

console.assert(minArea(tr(["0", "1", "1", "1", "1"]), 2, 0) === 4)
console.assert(minArea(tr(["0", "1", "1", "1", "0"]), 2, 0) === 3)
console.assert(minArea(tr(["1", "1", "1", "1", "0"]), 2, 0) === 4)

console.assert(
  minArea(tr(["0010", "0110", "0100"]), 0, 2) === 6
)

console.assert(
  minArea(tr(["0000","1111"]), 1, 0) === 4
)
