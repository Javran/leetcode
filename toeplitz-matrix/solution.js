/**
 * @param {number[][]} matrix
 * @return {boolean}
 */
const isToeplitzMatrix = mat => {
  const rows = mat.length
  if (rows <= 1)
    return true
  const cols = mat[0].length
  if (cols <= 1)
    return true

  // top-right centered half of the mat.
  for (let j = 0; j < cols; ++j) {
    const fst = mat[0][j]
    for (let i = 1; i < rows && j+i < cols; ++i) {
      if (fst !== mat[i][(j+i)%cols])
        return false
    }
  }

  // botton-down centered half
  for (let i = 1; i < rows; ++i) {
    const fst = mat[i][0]
    for (let j = 1; i+j < rows && j < cols; ++j) {
      if (fst !== mat[i+j][j])
        return false
    }
  }
  return true
}
