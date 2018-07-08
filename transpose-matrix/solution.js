/**
 * @param {number[][]} A
 * @return {number[][]}
 */
const transpose = A => {
  // straight forward A[i][j] = B[j][i] by definition
  if (A.length === 0) {
    return []
  }
  const N = A.length
  const M = A[0].length
  const B = new Array(M)
  for (let j = 0; j < M; ++j)
    B[j] = new Array(N)

  for (let i = 0; i < N; ++i) {
    for (let j = 0; j < M; ++j) {
      B[j][i] = A[i][j]
    }
  }
  return B
}

console.log(transpose([[1,2,3],[4,5,6],[7,8,9]]))
console.log(transpose([[1,2,3],[4,5,6]]))
console.log(transpose([]))
