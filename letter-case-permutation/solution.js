const code0 = '0'.codePointAt(0)
const code9 = '9'.codePointAt(0)
const codeA = 'A'.codePointAt(0)

/**
 * @param {string} S
 * @return {string[]}
 */
const letterCasePermutation = S => {
  const cur = new Array(S.length)
  const ans = []

  const splitCh = ind => {
    const code = S.codePointAt(ind)
    if (code >= code0 && code <= code9)
      return null
    return codeA + (code & 31) -1
  }

  const gen = dep => {
    if (dep === S.length) {
      ans.push(cur.join(''))
      return
    }

    const code = S.codePointAt(dep)
    if (code >= code0 && code <= code9) {
      cur[dep] = S[dep]
      gen(dep+1)
    } else  {
      const upCode = codeA + (code & 31) -1
      cur[dep] = String.fromCodePoint(upCode+32)
      gen(dep+1)
      cur[dep] = String.fromCodePoint(upCode)
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
