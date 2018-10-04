/**
 * @param {number[]} A
 * @return {boolean}
 */
const isMonotonic = xs => {
  if (xs.length <= 2) {
    return true
  }
  let sign = 0
  for (let i = 1; i < xs.length; ++i) {
    const cur = Math.sign(xs[i] - xs[i-1])
    if (sign === 0) {
      if (cur !== 0) {
        sign = cur
      }
    } else {
      if (cur !== 0 && cur !== sign) {
        return false
      }
    }
  }
  return true
}

const {cTestFunc} = require('leetcode-zwischenzug')
const f = cTestFunc(isMonotonic)

f([1,2,2,4])(true)
f([2,2,2,2])(true)
f([3,2,2,1,1,1])(true)
f([3,2,5,1,1,1])(false)
