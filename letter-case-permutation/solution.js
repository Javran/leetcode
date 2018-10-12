/**
 * @param {string} S
 * @return {string[]}
 */
const letterCasePermutation = S => {
  S = S.toUpperCase()
  const cur = new Array(S.length)
  const ans = []

  const gen = dep => {
    if (dep === S.length) {
      ans.push(cur.join(''))
      return
    }

    const code = S.codePointAt(dep)
    if (code <= 57 /* '9' */) {
      cur[dep] = String.fromCodePoint(code)
      gen(dep+1)
    } else  {
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
