/**
 * @param {string} s
 * @return {string}
 */
const shortestPalindrome = s => {
  /*
     credit to hpplayer about the idea of using KMP.
     ref: https://leetcode.com/problems/shortest-palindrome/discuss/60113/Clean-KMP-solution-with-super-detailed-explanation

     idea: since we are only allowed to add characters in front of the original string,
     the best thing we can do is to identify the longest prefix string that is already
     a palindrome, and take remaining chars, reverse them and prepend.

     so now the question becomes finding an efficient way of identifying
     the longest prefix string which is also a palindrome, this is where KMP comes into play.

     remember that the pre-processing of KMP gives us info about longest prefix which is also a suffix of the current substring,
     we can use this property and build "pi" for p = s + '#' + reversed s. and then the last element of pi
     tells us the longest palindrome.
   */
  const revS = s.split('').reverse().join('')
  const sTmp = `${s}#${revS}`
  const pi = new Int16Array(sTmp.length+1)
  pi[0] = -1
  let k = -1
  for (let i = 1; i <= sTmp.length; ++i) {
    while (k >= 0 && sTmp.codePointAt(k) !== sTmp.codePointAt(i-1)) {
      k = pi[k]
    }
    pi[i] = ++k
  }
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
