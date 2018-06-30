/**
 * @param {number} n
 * @return {boolean}
 */
const hasAlternatingBits = n => {
  if (n <= 1)
    return true
  // idea: note that we can actually test 2 bits at a time:
  // the pattern is either 1,01,01,01,... or 10,10,10,10,...
  // which can be distinguished by testing last bit.
  let i = n
  if (n & 1) {
    // when last bit is 1
    for (/* NOOP */; i > 1; i >>= 2) {
      // last two bits must be '01' (in binary)
      if ((i & 3) !== 1)
        return false
    }
    // first bit is 1
    return i === 1
  } else {
    // when last bit is 0
    for (/* NOOP */; i > 1; i >>= 2) {
      // last two bits must be '10' (in binary)
      if ((i & 3) !== 2)
        return false
    }
    return i === 0
  }
}

console.assert(hasAlternatingBits(5))
console.assert(!hasAlternatingBits(7))
console.assert(hasAlternatingBits(10))
