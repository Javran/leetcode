/**
 * @param {number} n
 * @return {boolean}
 */
const isPowerOfThree = n => {
  if (n <= 0)
    return false

  const p = Math.round(Math.log(n) / Math.log(3))
  return Math.pow(3,p) === n
}

console.log(isPowerOfThree(3))
console.log(isPowerOfThree(6560))
console.log(isPowerOfThree(6561))
console.log(isPowerOfThree(1))
