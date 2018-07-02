/**
 * @param {number[]} bills
 * @return {boolean}
 */
const lemonadeChange = xs => {
  let fiveCount = 0, tenCount = 0
  for (let i = 0; i < xs.length; ++i) {
    const paid = xs[i]
    if (paid === 5) {
      ++fiveCount
    } else if (paid === 10) {
      if (fiveCount <= 0)
        return false
      --fiveCount, ++tenCount
    } else if (paid === 20) {
      const plan1 = fiveCount >= 1 && tenCount >= 1
      if (plan1) {
        --fiveCount, --tenCount
        continue
      }
      const plan2 = fiveCount >= 3
      if (plan2) {
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
