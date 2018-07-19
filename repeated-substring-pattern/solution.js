/**
 * @param {string} s
 * @return {boolean}
 */
const repeatedSubstringPattern = s => {
  if (s.length <= 1)
    return false
  /*
     idea: some to do with self-similiarity. try KMP table:
     pi[i] is the largest length of proper suffix of 0..i-1 which is
     also a prefix of 0..i-1, also define pi[0] = -1 for marking termination.
   */

  const pi = new Int16Array(s.length+1)
  pi[0] = -1
  let k = -1
  for (let i = 1; i <= s.length; ++i) {
    while (k >= 0 && s.codePointAt(k) !== s.codePointAt(i-1)) {
      k = pi[k]
    }
    pi[i] = ++k
  }
  /*
     we can find a pattern here: when string repeats itself:

     - cLen = s.length - last indicates the length of the smallest cycle length
     - last % cLen === 0 and also s.length % cLen === 0
     - last % cLen === 0 && (s.length/cLen - 1)*cLen === last
       => (s.length - cLen)/cLen*cLen = last, which holds trivially.
   */
  const last = pi[s.length]
  const cLen = s.length - last
  return last > 0 && last % cLen === 0
}

console.assert(repeatedSubstringPattern("abcabcabc"))
console.assert(!repeatedSubstringPattern("abcabcabcaba"))
console.assert(repeatedSubstringPattern("abaaba"))
console.assert(repeatedSubstringPattern("aa"))
console.assert(!repeatedSubstringPattern("a"))
console.assert(!repeatedSubstringPattern("abac"))
console.assert(!repeatedSubstringPattern("ab"))
console.assert(repeatedSubstringPattern("aaaaaa"))
