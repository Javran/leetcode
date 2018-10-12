const code0 = '0'.codePointAt(0)
const code9 = '9'.codePointAt(0)
const codeA = 'A'.codePointAt(0)

const splitCh = code => {
  if (code >= code0 && code <= code9)
    return [String.fromCodePoint(code)]
  const upCode = codeA + (code & 31) -1
  return [String.fromCodePoint(upCode+32), String.fromCodePoint(upCode)]
}

/**
 * @param {string} S
 * @return {string[]}
 */
const letterCasePermutation = S => {
  const cur = new Array(S.length)
  const ans = []
  const gen = dep => {
    if (dep === S.length) {
      ans.push(cur.join(''))
      return
    }
    splitCh(S.codePointAt(dep)).forEach(ch => {
      cur[dep] = ch
      gen(dep+1)
    })
  }

  gen(0)
  return ans
}

const {cTestFunc} = require('leetcode-zwischenzug')
const f = cTestFunc(letterCasePermutation)
f("a1b2")()
f("")()
