const _ = require('underscore')

/*
   (cont. from comments in solution_v1.js)

   It turns out that topScan and leftScan are not necessary -
   sq[i][j] can be simply determined from sq[i-1][j-1], sq[i-1][j] and sq[i][j-1].
   Imagine a case where side length is 3, let's overlap 3
   different squares of size 3 and name them A,B,C:

   [A  ] [AB ] [AB ] [ B ]
   [A C] [ABC] [ABC] [ B ]
   [A C] [ABC] [ABC] [ B ]
   [  C] [  C] [  C] [   ] <- (i,j)

   should be straighforward to see that:

   sq[i][j] = min(sq[i-1][j-1],sq[i-1][j],sq[i][j-1])+1

 */
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

  const sq = Array(h).fill().map(() =>
    // well, there is no reason not to.
    new Uint16Array(w).fill(0)
  )

  let max = 0
  for (let i=0; i<h; ++i) {
    for (let j=0; j<w; ++j) {
      const cell = getMat(i,j)
      if (!cell)
        continue
      if (i === 0)
        sq[0][j] = 1
      if (j === 0)
        sq[i][0] = 1
      if (i > 0 && j > 0)
        sq[i][j] = 1 + Math.min(sq[i-1][j], Math.min(sq[i][j-1], sq[i-1][j-1]))
      if (sq[i][j] > max)
        max = sq[i][j]
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
