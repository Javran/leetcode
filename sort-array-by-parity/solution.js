/**
 * @param {number[]} A
 * @return {number[]}
 */
/*
   idea: we can do a straightforward sorting about parity
 */
const sortArrayByParitySlow = A => A.sort((x,y) => (x & 1) - (y & 1))

const sortArrayByParity = A => {
  /*
     idea: put them into two buckets about parity
   */
  const evens = []
  const odds = []
  for (let i = 0; i < A.length; ++i) {
    const n = A[i];
    ((n & 1) ? odds : evens).push(n)
  }
  return evens.concat(odds)
}
