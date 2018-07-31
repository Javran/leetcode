/**
 * @param {number} x
 * @return {boolean}
 */
const isPalindrome = x => {
  /*
     idea:
     this is EXACTLY why you should never try to test a string property
     without using string unless performance is critical
     this is just more complicated for nothing.

     optimize: looks like (_ >>> 0) is a more efficient way to
     take floor than Math.floor. noted.
   */
  if (x < 0)
    return false
  if (x < 10)
    return true
  let num = x
  let base = 10 ** (Math.log10(x) >>> 0)
  for (
    /* NOOP */;
    base >= 100;
    /* NOOP */
  ) {
    const head = (num / base) >>> 0
    const last = num % 10
    if (head !== last)
      return false
    num = ((num - head * base) / 10) >>> 0
    base /= 100
  }
  if (base === 10) {
    return ((num / 10) >>> 0) === num % 10
  } else {
    return true
  }
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(isPalindrome)

f(0)(true)
f(10)(false)
f(1551)(true)
f(1552)(false)
f(1234321)(true)
f(1000001)(true)
f(99999)(true)
f(99)(true)
f(2)(true)
f(1000030001)(false)
