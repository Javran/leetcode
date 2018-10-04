/**
 * @param {number[]} A
 * @return {boolean}
 */
const isMonotonic = xs => {
  /*
     idea: we want to identify whether
     the array number runs in a certain direction:

     - sign === 0: for now the scanned part of the array all have the same value
     - sign === 1: the scanned part is increasing, so we need rest of
       the array to be non-decreasing
     - sign === -1: mirror case of sign === 1
   */
  if (xs.length <= 2) {
    return true
  }
  let sign = 0
  for (let i = 1; i < xs.length; ++i) {
    const cur = Math.sign(xs[i] - xs[i-1])
    if (sign === 0) {
      // the array "direction" is not yet determined
      if (cur !== 0) {
        sign = cur
      }
    } else {
      // the array "direction" is determined,
      // and we want rest of the array to be consistent with our direction.
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
