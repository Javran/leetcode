/**
 * @param {number} c
 * @return {boolean}
 */
const judgeSquareSum = c => {
  /*
     let's assume a >= b without loss of generality.
     what we wanna do is to try every possible b and see
     if we can figure out a:

     - c - b*b has to be a perfect square number
     - a >= b

   */

  for (let b = 0; b*b <= c; ++b) {
    const a = Math.floor(Math.sqrt(c - b*b))
    if (a < b)
      return false
    if (a*a+b*b === c)
      return true
  }
  return false
}
