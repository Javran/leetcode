/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
const spiralOrder = mat => {
  // no trick for this one, just make sure to do it literally.
  if (!mat || mat.length === 0 || mat[0].length === 0)
    return []
  const m = mat.length
  const n = mat[0].length
  let minRow = 0, maxRow = m-1, minCol = 0, maxCol = n-1
  const ans = []
  let i = 0, j = 0
  const rec = () => ans.push(mat[i][j])
  rec()
  // dir: 0(right), 1(down), 2(left), 3(up)
  let dir = 0
  while (minRow <= maxRow && minCol <= maxCol) {
    if (dir === 0) {
      // going right
      while (j+1 <= maxCol) {
        ++j
        rec()
      }
      dir = 1
      ++minRow
    } else if (dir === 1) {
      // going down
      while (i+1 <= maxRow) {
        ++i
        rec()
      }
      dir = 2
      --maxCol
    } else if (dir === 2) {
      // going left
      while (j-1 >= minCol) {
        --j
        rec()
      }
      dir = 3
      --maxRow
    } else if (dir === 3) {
      // going up
      while (i-1 >= minRow) {
        --i
        rec()
      }
      dir = 0
      ++minCol
    }
  }
  return ans
}

console.log(
  spiralOrder(
    [
      [ 1, 2, 3 ],
      [ 4, 5, 6 ],
      [ 7, 8, 9 ]
    ]
  )
)

console.log(
 spiralOrder(
   [
     [1, 2, 3, 4],
     [5, 6, 7, 8],
     [9,10,11,12]
   ]
 )
)

const test = () => {
  const gen = () => Math.floor(Math.random() * 100)
  const m = 1 + Math.floor(Math.random() * 6)
  const n = 1 + Math.floor(Math.random() * 6)
  const mat = new Array(m).fill(null)
  for (let i = 0; i < m; ++i) {
    mat[i] = new Array(n).fill(null)
    for (let j = 0; j < n; ++j) {
      mat[i][j] = gen()
    }
  }
  console.log(mat)
  console.log(spiralOrder(mat))
}

test()
