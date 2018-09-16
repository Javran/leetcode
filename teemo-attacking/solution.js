/**
 * @param {number[]} timeSeries
 * @param {number} duration
 * @return {number}
 */
const findPoisonedDuration = (timeSeries, duration) => {
  // not necessary
  if (duration === 0)
    return 0
  let lastAtk = null
  let ans = 0
  for (let i = 0; i < timeSeries.length; ++i) {
    const t = timeSeries[i]
    if (i > 0) {
      if (lastAtk + duration <= t) {
        ans += duration
      } else {
        ans += t - lastAtk
      }
    }
    lastAtk = t
  }
  if (lastAtk !== null)
    ans += duration
  return ans
}

const {cTestFunc, genInt} = require('leetcode-zwischenzug')
const f = cTestFunc(findPoisonedDuration)
f([1,4],2)(4)
f([1,2],2)(3)
f([], 1000)(0)

const xs = [1,6,9,12,14,15,21,28,31,33,37,42,46,47,49,53,60,64,69,74,79,85,90,94,101,104,107,112,113,116,117,120,125,126,133,138,143,146,148,155,156,161,165,167,169,171,176,177,183,189,194,199,202,208,213,220,223,227,233,239,242,247,251,254,257,263,268,269,275,278,285,286,290,291,292,294,295,301,302,303,310,312,314,315,320,323,326,329,330,333,335,337,338,341,345,352,357,359,362,369,374]
f(xs,4)(307)
f(xs,5)(348)
f(xs,6)(369)
f(xs,7)(380)
f(xs,8)(381)
