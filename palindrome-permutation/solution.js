/**
 * @param {string} s
 * @return {boolean}
 */
const canPermutePalindrome = s => {
  // do a freq count, if it's possible to re-arrange,
  // s must at most 1 char of odd freq.

  // note that even if 16 bits are not enough, it doesn't matter
  // as we only interested in parity, which does not change
  // for a overflow situation
  const freq = new Uint16Array(256).fill(0)
  for (let i = 0; i < s.length; ++i) {
    ++freq[s.codePointAt(i)]
  }
  let violateCount = 0
  for (let i = 0; i <= 255 && violateCount <= 1; ++i) {
    if (Boolean(freq[i] & 1))
      ++violateCount
  }
  return violateCount <= 1
}
