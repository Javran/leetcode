const rDigits = [0,1,2,5,6,8,9]
const afterRotate = new Array(10);
afterRotate[0] = {val: 0, changed: false}
afterRotate[1] = {val: 1, changed: false}
afterRotate[2] = {val: 5, changed: true}
afterRotate[5] = {val: 2, changed: true}
afterRotate[6] = {val: 9, changed: true}
afterRotate[8] = {val: 8, changed: false}
afterRotate[9] = {val: 6, changed: true}

/**
 * @param {number} N
 * @return {number}
 */
const rotatedDigits = N => {
  if (N <= 1)
    return 0
  let ans = 0
  let stop = false

  const digits = new Int8Array(5)
  let num = 0

  const go = dep => {
    if (dep === 5) {
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
        const rotated = new Int8Array(ds.length)
        ds.forEach((d, ind) => {
          const {val, changed} = afterRotate[d]
          different = different || changed
          rotated[ds.length - ind -1] = val
        })
        if (different)
          ++ans
      }
      return
    }
    const numTmp = num
    num *= 10
    for (let i = 0; i < rDigits.length && !stop; ++i) {
      const d = rDigits[i]
      digits[dep] = d
      num += d
      go(dep+1)
      num -= d
    }
    num = numTmp
  }
  go(0)

  return ans
}

console.log(rotatedDigits(109))
