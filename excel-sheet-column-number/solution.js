/**
 * @param {string} s
 * @return {number}
 */
const titleToNumber = s => {
  /*
     idea: just need to find the pattern.
   */
  let ans = 0
  for (let base = 1, i = s.length-1; i >= 0; --i, base *= 26) {
    const code = s.codePointAt(i) & 31
    ans += code * base
  }
  return ans
}

const {cTestFunc} = require('leetcode-zwischenzug')
const f = cTestFunc(titleToNumber)
f("A")(1)
f("ZZAZB")(12339706)
f("ASDFGH")(20638470)
