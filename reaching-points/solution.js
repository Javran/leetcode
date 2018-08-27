/**
 * @param {number} sx
 * @param {number} sy
 * @param {number} tx
 * @param {number} ty
 * @return {boolean}
 */
const reachingPoints = (sx, sy, tx, ty) => {
  /*
     idea: "you know when you know" situation,
     in which every other method will lead to TLE, well I have nothing to say.
   */
  while (tx >= sx && ty >= sy) {
    if (tx === ty) {
      // only possible when starting point happens to be target.
      return sx === tx && sy === ty
    }
    /*
       (x,y) => (x,x+y) or (x+y,y)

       note that given (x,y) we can always "step back":

       - say if x > y, we now y will be one of the original pair therefore x - y is the other.
       - or if y > x, we'll similarly have (x, y-x)
     */
    if (tx > ty) {
      // `- ty` from `tx` as many times as possible
      if (ty > sy)
        tx %= ty
      else
        return (tx - sx) % ty === 0
    } else {
      if (tx > sx)
        ty %= tx
      else
        return (ty - sy) % tx === 0
    }
  }
  return sx === tx && sy === ty
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(reachingPoints)
f(9,5,12,8)(false)
f(2,3,13,12)(false)
