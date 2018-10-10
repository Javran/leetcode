/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
const reverseStr = (s, k) => {
  const ansArr = []
  for (let i = 0, rev = true; i < s.length; i += k, rev = !rev) {
    const cur = s.substring(i, i+k)
    ansArr.push(rev ? cur.split('').reverse().join('') : cur)
  }
  return ansArr.join('')
}

const {cTestFunc} = require('leetcode-zwischenzug')
const f = cTestFunc(reverseStr)

f("abcd", 1)("abcd")
f("abcdefg", 2)("bacdfeg")
f("abcdefg", 3)("cbadefg")
f("abcd", 9)("dcba")
f("abcdefgh", 3)("cbadefhg")
