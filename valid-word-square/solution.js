/**
 * @param {string[]} words
 * @return {boolean}
 */
const validWordSquare = words => {
  /*
     idea: just need to test whether the matrix
     is the transpose of itself.

     note that elements in words might not be of the same length
   */
  const rows = words.length
  if (rows === 0)
    return true
  let cols = words[0].length
  for (let i = 1; i < rows; ++i)
    if (words[i].length > cols)
      cols = words[i].length
  if (rows !== cols)
    return false
  const N = rows
  const getCh = (i,j) => {
    const rowStr = words[i]
    return j < rowStr.length ? rowStr[j] : null
  }
  for (let i = 0; i < N; ++i) {
    for (let j = i+1; j < N; ++j) {
      if (getCh(i,j) !== getCh(j,i))
        return false
    }
  }
  return true
}

const {cTestFunc} = require('leetcode-zwischenzug')
const f = cTestFunc(validWordSquare)

f([
  "abcd",
  "bnrt",
  "crmy",
  "dtye"
])(true)
f([
  "abcd",
  "bnrt",
  "crm",
  "dt"
])(true)
f([
  "ball",
  "area",
  "read",
  "lady"
])(false)

// to problem setter: flip you
f(["abc","bde","cefg"])(false)
