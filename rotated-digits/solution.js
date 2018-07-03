// it's only rotate-able if we use this fixed set of digits
// so that's what we gonna do.
const rDigits = Int8Array.from([0,1,2,5,6,8,9])
const changed = new Int8Array(10)
changed[2] = 1, changed[5] = 1
changed[6] = 1, changed[9] = 1

/**
 * @param {number} N
 * @return {number}
 */
const rotatedDigits = N => {
  // just having fun overcomplicating stuff...
  // well, it could be faster if we don't enumerate only possible solutions
  // and just go from 1 all the way to N.
  if (N <= 1)
    return 0
  let ans = 0
  let stop = false
  const digits = new Int8Array(5)
  const go = dep => {
    if (dep === 5) {
      const num = digits.reduce((hi,lo) => hi*10+lo)
      if (num > N) {
        stop = true
        return
      }
      let i = 0
      while (digits[i] === 0 && i+1 < 5)
        ++i
      if (digits[i] !== 0) {
        if (
          digits.slice(i,5).some(d => changed[d])
        )
          ++ans
      }
      return
    }
    for (let i = 0; i < rDigits.length && !stop; ++i) {
      digits[dep] = rDigits[i]
      go(dep+1)
    }
  }
  go(0)
  return ans
}

console.assert(rotatedDigits(109) === 44)
console.assert(rotatedDigits(10000) === 2320)
