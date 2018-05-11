const _ = require('underscore')

const maximalSquare = mat => {
  const h = mat.length
  const w = _.max(mat.map(x => x.length))
  if (h === 0 || w === 0)
    return 0

  // getMat : (Int, Int) => false | true
  const getMat = (i,j) => {
    if (i < 0 || j < 0 || i >= h || j >= w)
      return false
    const row = mat[i]
    if (j in row) {
      return row[j] === '1'
    } else {
      return false
    }
  }

  const mkMat = () =>
    Array(h).fill().map(() =>
      new Uint16Array(w).fill(0)
    )

  /*
     let topScan[i][j] be the length of longest consecutive "1"s from top.

     - topScan[0][j] = if getMat(0,j) then 1 else 0
     - topScan[i][j] = 0
       (if getMat(i,j) === false)
     - topScan[i][j] = topScan[i-1][j] + 1
       (if getMat(i,j) === true)

     similarly for leftScan:

     - leftScan[i][0] = if getMat(i,0) then 1 else 0
     - leftScan[i][j] = 0
       (if getMat(i,j) === false)
     - leftScan[i][j] = leftScan[i][j-1] + 1
       (if getMat(i,j) === true)

   */
  const topScan = mkMat()
  const leftScan = mkMat()
  const sq = mkMat()

  for (let i = 0; i<h; ++i) {
    for (let j = 0; j<w; ++j) {
      if (i === 0)
        topScan[0][j] = getMat(0,j) ? 1 : 0

      if (j === 0)
        leftScan[i][0] = getMat(i,0) ? 1 : 0

      if (getMat(i,j)) {
        if (i > 0)
          topScan[i][j] = topScan[i-1][j] + 1
        if (j > 0)
          leftScan[i][j] = leftScan[i][j-1] + 1
      }
    }
  }

  /*
     let sq[i][j] stands for the side length of the maximal square
     whose bottom-right corner is at (i,j) (let's call this (i,j)-square for short)

     - sq[-][-] = 0 if getMat(-,-) === false (no assignment, using default val)
     - sq[0][j] = if getMat(0,j) then 1 else 0
     - sq[i][0] = if getMat(i,0) then 1 else 0
     - sq[i][j] = k+1

       where k starts at sq[i-1][j-1] and go down until 0
       and meets the requirement as described below in the code.

       the idea is to compute (i,j)-square from (i-1,j-1)-square.

       suppose we have:

       11
       11 <- (i-1,j-1)

       to be able to extend from (i-1,j-1), we want to check
       if "?" cells below are filled:

       11?
       11?
       ??? <- (i,j)

       yup, that's why I need topScan and leftScan in the first place -
       to tell if these lines are filled in constant time.

       however, there are cases where:

       110
       111
       011 <- (i,j)

       this time, we cannot simply extend from (i-1,j-1)-square,
       but note that we actually have more than one (i-1,j-1)-squares:
       if (i-1,j-1)-square of side length k is available, so does k-1, k-2, ..., 1.
       and that's why we have to introduce k and allow it to go down
       until the largest compatible (i-1,j-1) is found.

   */
  let max = 0
  for (let i=0; i<h; ++i) {
    for (let j=0; j<w; ++j) {
      if (i === 0)
        sq[0][j] = getMat(0,j) ? 1 : 0
      if (j === 0)
        sq[i][0] = getMat(i,0) ? 1 : 0
      if (getMat(i,j)) {
        if (i > 0 && j > 0) {
          // at least 1
          sq[i][j] = 1

          // shrink until fit
          const sz = sq[i-1][j-1]
          for (let k = sz; k >= 0; --k) {
            if (leftScan[i][j] >= k+1 && topScan[i][j] >= k+1) {
              sq[i][j] = k+1
              break
            }
          }
          if (sq[i][j] > max)
            max = sq[i][j]
        }

        // subtle: put this outside of if-stmt.
        // we want this to work even if there is only one filled cell
        if (sq[i][j] > max)
          max = sq[i][j]
      }
    }
  }

  return max*max
}

console.log(maximalSquare(
[
  ["0","0","0","1"],
  ["1","1","0","1"],
  ["1","1","1","1"],
  ["0","1","1","1"],
  ["0","1","1","1"]
])
)
