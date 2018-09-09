/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
const getSumRec = (a, b) => {
  // recursive version
  /*
     idea: XOR and carry
     by doing so we gradually "shift" 1s to first argument of getSum until the second one is 0.
   */
  let ans = a ^ b
  let carry = (a & b) << 1
  if (carry !== 0) {
    return getSumRec(ans, carry)
  } else {
    return ans
  }
}

const getSum = (a, b) => {
  while (b !== 0) {
    let carry = (a & b) << 1
    a ^= b
    b = carry
  }
  return a
}

const {cTestFunc} = require('leetcode-zwischenzug')
const f = cTestFunc(getSum)

for (let i = -10; i <= 10; ++i)
  for (let j = -10; j <= 10; ++j)
    f(i,j)(i+j)
