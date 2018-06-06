/**
 * @param {number} n
 * @return {boolean}
 */
const isPowerOfTwo = n => {
  /*
     powers of two
     are numbers
     whose popcount
     is exactly
     1
   */
  if (n <= 0)
    return false
  let count = 0
  for (let i = n; i > 0; i >>= 1) {
    if (Boolean(i&1))
      ++count
    // can probably test count > 1 here to short-circuit
    // but the loop might be too tiny to worth it.
  }
  return count === 1
}

console.log([1,2,3,4,6,8,65536].map(isPowerOfTwo))
