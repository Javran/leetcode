/**
 * @param {number[]} bills
 * @return {boolean}
 */
const lemonadeChange = xs => {
  // note that we can never change $20 to customers,
  // so there is no need recording that.
  let fiveCount = 0, tenCount = 0
  for (let i = 0; i < xs.length; ++i) {
    const paid = xs[i]
    if (paid === 5) {
      ++fiveCount
    } else if (paid === 10) {
      // the only possible option we have: provide one $5
      if (fiveCount <= 0)
        return false
      --fiveCount, ++tenCount
    } else if (paid === 20) {
      /* here we need to provide $15
         which boil down to two plans:

         (1) one $5 and one $10
         (2) three $5

         note that (1), if possible, is always better,
         because it's the only way to use our $10 and use minimum number
         of $5 - as $5 is more commonly used for other amount of bill as well.
       */
      if (fiveCount >= 1 && tenCount >= 1) {
        --fiveCount, --tenCount
        continue
      }
      if (fiveCount >= 3) {
        fiveCount -= 3
        continue
      }
      return false
    }
  }
  return true
}

console.assert(lemonadeChange([5,5,5,10,20]))
console.assert(lemonadeChange([5,5,10]))
console.assert(!lemonadeChange([5,5,10,10,20]))
