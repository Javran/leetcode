/**
 * @param {number} num
 * @return {boolean}
 */
const isUgly = num => {
  if (num <= 0)
    // ugly nums must be positive
    return false
  /*
     ugly numbers U = 2^x * 3^y * 5^z,
     we want to get rid of all these factors and see
     whether remaining value is 1 (in which case it is a ugly number)
   */
  while (num % 2 == 0)
    num /= 2
  while (num % 3 == 0)
    num /= 3
  while (num % 5 == 0)
    num /= 5
  return num === 1
}
