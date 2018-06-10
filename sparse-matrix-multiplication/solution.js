/**
 * @param {number[][]} A
 * @param {number[][]} B
 * @return {number[][]}
 */
const multiply = (A, B) => {
  // one thing we can use in case of sparse matrices:
  // we can only scan for non-zero elements
  // as it is the only way to contribute non-zero values
  // to the resulting matrix
  const m = A.length
  const n = A[0].length
  const r = B[0].length
  // begin with an Array filled with 0
  const C = new Array(m)
  for (let i = 0; i < m; ++i) {
    C[i] = new Array(r).fill(0)
  }

  // contribute to C
  for (let i = 0; i < m; ++i)
    for (let j = 0; j < n; ++j)
      if (A[i][j]) {
        // only when we detect non-zero components.
        for (let k = 0; k < r; ++k)
          C[i][k] += A[i][j]*B[j][k]
      }
  return C
}

console.log(multiply([[1,0,0], [-1,0,3]], [[7,0,0],[0,0,0],[0,0,1]]))
