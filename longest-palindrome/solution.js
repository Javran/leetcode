/**
 * @param {string} s
 * @return {number}
 */
const longestPalindrome = s => {
  /*
     a palindrome consists of letter dupes, which means
     - any char with odd count got to have "leftover".
     - we can use one of these leftovers given it's available.
       (i.e. there are chars of odd count)
   */
  const freqCount = new Uint16Array(256)
  for (let i = 0; i < s.length; ++i)
    ++freqCount[s.codePointAt(i)]
  // any odd value sets this oddFlag
  const oddFlag = freqCount.some(x => x & 1)
  const count = freqCount.reduce(
    (acc, x) => (x & 1) ? acc + x - 1 : acc + x,
    0
  )
  return (oddFlag ? 1 : 0) + count
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(longestPalindrome)
f("abccccdd")(7)
f("aa")(2)
f("Aa")(1)
f("Abcd")(1)
f("AbcdA")(3)
