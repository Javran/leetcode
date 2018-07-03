// it's only rotate-able if we use this fixed set of digits
// so that's what we gonna do.
const rDigits = [0,1,2,5,6,8,9]
// would using a digit (rotate-able) change the number?
const afterRotate = new Array(10)
afterRotate[0] = false
afterRotate[1] = false
afterRotate[2] = true
afterRotate[5] = true
afterRotate[6] = true
afterRotate[8] = false
afterRotate[9] = true

/**
 * @param {number} N
 * @return {number}
 */
const rotatedDigits = N => {
  // just having fun overcomplicating stuff...
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
        // got non-all-zero solution, checking range [i .. 4]
        const ds = digits.slice(i,5)
        let different = false
        for (let ind = i; ind < 5; ++ind) {
          different = different || afterRotate[digits[ind]]
        }
        if (different)
          ++ans
      }
      return
    }
    for (let i = 0; i < rDigits.length && !stop; ++i) {
      const d = rDigits[i]
      digits[dep] = d
      go(dep+1)
    }
  }
  go(0)

  return ans
}

console.assert(rotatedDigits(109) === 44)
console.assert(rotatedDigits(10000) === 2320)
