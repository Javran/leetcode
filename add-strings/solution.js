/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
const addStrings = (num1, num2) => {
  /*
     idea: turn into array rep.
   */

  // until we actually carry out the addition, we won't know
  // ahead of time whether the extra bit is necessary, so
  // here we'll just take the longest of the two.
  // but since we preseve the carry bit `c`,
  // we'll have this info in the end for producing the correct answer
  const len = Math.max(num1.length, num2.length)
  const xs = new Uint8Array(len)
  for (let i = 0; i < num1.length; ++i)
    xs[num1.length - i - 1] = num1.codePointAt(i) & 0xF
  const ys = new Uint8Array(len)
  for (let i = 0; i < num2.length; ++i)
    ys[num2.length - i - 1] = num2.codePointAt(i) & 0xF
  let c = 0
  for (let i = 0; i < len; ++i) {
    const cur = xs[i] + ys[i] + c
    if (cur >= 10) {
      c = 1
      xs[i] = cur - 10
    } else {
      c = 0
      xs[i] = cur
    }
  }
  const result = xs.reverse().join('')
  return c === 0 ? result : `1${result}`
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(addStrings)
f("0", "11234")()
f("123", "0")()
f("9999", "10")()
