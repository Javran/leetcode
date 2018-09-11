const DS = '0123456789abcdef'
const COM = 2 ** 32

/**
 * @param {number} num
 * @return {string}
 */
const toHex = num => {
  /*
     idea: two's complement is easily computed
     with COM+num (for num < 0), as in JavaScript
     a number can store integer larger than int32.
   */
  if (num === 0)
    return '0'

  if (num < 0)
    num += COM

  let ans = []
  while (num > 0) {
    ans.push(DS[num & 0xF])
    // avoid using bitwise operations for this
    // as it will force num to be int32
    num = Math.floor(num / 16)
  }

  return ans.reverse().join('')
}

const {cTestFunc} = require('leetcode-zwischenzug')
const f = cTestFunc(toHex)

f(0)('0')
f(-1)('ffffffff')
f(26)('1a')
f(-123123)('fffe1f0d')
f(12345667)('bc6143')
