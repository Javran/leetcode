/**
 * @param {string} S
 * @return {string[]}
 */
const letterCasePermutation = S => {
  /*
     idea: a recursive solution should do.
   */

  /*
     observation: the output value is a set of strings
     and is irrelevant to original case of input,
     therefore we may as well "normalize" the input
     so to reduce the amount of branching during recursion.
   */
  S = S.toUpperCase()

  // tmp structure for building the string
  const cur = new Array(S.length)
  const ans = []

  const gen = dep => {
    if (dep === S.length) {
      ans.push(cur.join(''))
      return
    }

    const code = S.codePointAt(dep)
    // assume that the input only contains 0-9, A-Z, a-z this bound check is safe.
    if (code <= 57 /* '9' */) {
      cur[dep] = String.fromCodePoint(code)
      gen(dep+1)
    } else  {
      // try both lower and upper, eliminate intermediate need for Arrays
      cur[dep] = String.fromCodePoint(code+32)
      gen(dep+1)
      cur[dep] = String.fromCodePoint(code)
      gen(dep+1)
    }
  }

  gen(0)
  return ans
}

const {cTestFunc} = require('leetcode-zwischenzug')
const f = cTestFunc(letterCasePermutation)

f("a1b2")()
f("")()
