/**
 * @param {string} A
 * @param {string} B
 * @return {string[]}
 */
const uncommonFromSentences = (A, B) => {
  /*
     idea: do what's asked.

     We'll have a simplified version of freqCount:

     let the result of freqCount be m, then:
     - !m.has(k) => k has not appeared at all
     - m.get(k) === true => k appears only once
     - m.get(k) === false => k appears more than once

     this info is sufficient for us to work out the solution.
   */
  const freqCount = X => {
    // false: more than once, true: exactly once
    const m = new Map()
    X.split(' ').forEach(w => {
      if (m.has(w)) {
        m.set(w, false)
      } else {
        m.set(w, true)
      }
    })
    return m
  }
  const mA = freqCount(A)
  const mB = freqCount(B)
  const ans = [];
  [... mA.entries()].forEach(([k, v]) => {
    if (v === true) {
      if (!mB.has(k))
        ans.push(k)
    }
  });
  [... mB.entries()].forEach(([k, v]) => {
    if (v === true) {
      if (!mA.has(k))
        ans.push(k)
    }
  })
  return ans
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(uncommonFromSentences)
f("this apple is sweet", "this apple is sour")()
f("apple apple", "banana")()
