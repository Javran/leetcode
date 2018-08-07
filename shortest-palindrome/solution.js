/**
 * @param {string} s
 * @return {string}
 */
const shortestPalindrome = s => {
  const revS = s.split('').reverse().join('')
  const sTmp = `${s}##${revS}`
  const pi = new Int16Array(sTmp.length+1)
  pi[0] = -1
  let k = -1
  for (let i = 1; i <= sTmp.length; ++i) {
    while (k >= 0 && sTmp.codePointAt(k) !== sTmp.codePointAt(i-1)) {
      k = pi[k]
    }
    pi[i] = ++k
  }
  // const pLen = s.substring(0, pi[sTmp.length])
  const sPre = s.substring(pi[sTmp.length]).split('').reverse().join('')
  return `${sPre}${s}`
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(shortestPalindrome)

f("catacb")("bcatacb")
f("aacecaaa")("aaacecaaa")
f("abcd")("dcbabcd")
f("")("")
f("aaa")("aaa")
