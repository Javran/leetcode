/**
 * @param {string} A
 * @param {string} B
 * @return {number}
 */
const repeatedStringMatch = (A, B) => {
  if (A.length === 0) {
    return -1
  }

  if (A.length >= B.length) {
    // we at most need to repeat twice to get the answer.
    if (A.indexOf(B) !== -1)
      return 1
    return (A+A).indexOf(B) === -1 ? -1 : 2
  }
  // padding A on both left and right, therefore +2.
  // it's a bit of overkill but it gets the job done.
  let times = Math.floor(B.length / A.length) + 2
  for (let i = 1, AA = A; i <= times; ++i, AA += A) {
    if (AA.indexOf(B) !== -1)
      return i
  }
  return -1
}
