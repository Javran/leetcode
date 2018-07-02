/**
 * @param {number[][]} A
 * @return {number}
 */
const matrixScore = mat => {
  const rows = mat.length
  const cols = mat[0].length
  // count how many 1s are there for each row
  const colOnes = new Array(cols).fill(0)
  colOnes[0] = rows
  /*
     process first col: we need all 1s in the world,
     this is because any 1XXXX is at least the sum of two 0XXXXs.
     this step is always possible by toggling rows
   */
  for (let i = 0; i < rows; ++i) {
    if (mat[i][0] === 0) {
      for (let j = 0; j < cols; ++j)
        mat[i][j] = 1 - mat[i][j]
    }
  }
  /*
     count how many ones are there for each row.
   */
  for (let i = 0; i < rows; ++i) {
    for  (let j = 1; j < cols; ++j) {
      if (mat[i][j])
        ++colOnes[j]
    }
  }
  /*
     note that flipping one col is basically just
     changing count of 1s (let's call it `x`) to `rows - x`,
     and we can take the greater one of them freely.
   */
  for (let j = 1; j < cols; ++j) {
    if (rows > 2*colOnes[j]) {
      colOnes[j] = rows - colOnes[j]
    }
  }
  // like converting binaries except that every digit can exceed 1
  return colOnes.reduce((x,y) => x*2 + y)
}

console.log(matrixScore([[0,0,1,1],[1,0,1,0],[1,1,0,0]]))
