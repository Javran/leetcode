/**
 * @param {number} num
 * @return {boolean}
 */
const isPowerOfFour = num => {
  if (num <= 0)
    return false
  /*
     4^? = num
     => ? * log2(4) = log2(num)
     => ? = log2(num) / 2

   */
  const v = Math.log2(num) / 2
  return Number.isInteger(v)
}
