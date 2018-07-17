/**
 * @param {number[]} bits
 * @return {boolean}
 */
const isOneBitCharacter = bits => {
  /*
     idea: there's actually only one way to interpret "bits":

     - when first bit is 0, we consume one bit and interpret remaining parts.
     - when first bit is 1, we consume two bits (so to cover 10 and 11 case) and proceed.

     if we stop our interpretation when hitting i+1 >= bits.length
     we can figure out whether the last bit is 0 (1 remaining bit to interpret)
     or it's 10 (all bits are interpreted)

   */
  // bits will not be empty.
  let i = 0
  while (i+1 < bits.length) {
    if (bits[i] === 1) {
      i += 2
    } else {
      ++i
    }
  }
  // i+1 == bits.length or i == bits.length
  return i+1 === bits.length
}
