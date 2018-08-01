/**
 * @param {string} s
 * @return {boolean}
 */
const checkRecord = s => {
  // more than 2 consecutive 'L' is the same as presence of 'LLL'
  if (s.indexOf('LLL') !== -1)
    return false

  let countA = 0
  for (let i = 0; countA <= 1 && i < s.length; ++i)
    if (s[i] === 'A')
      ++countA
  return countA <= 1
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(checkRecord)
f("PPALLP")(true)
f("LLLA")(false)
f("PPALA")(false)
