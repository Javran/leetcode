/**
 * @param {string} s
 * @return {boolean}
 */
const repeatedSubstringPattern = s => {
  if (s.length <= 1)
    return false

  const pi = new Int16Array(s.length+1)
  pi[0] = -1
  let k = -1
  for (let i = 1; i <= s.length; ++i) {
    while (k >= 0 && s.codePointAt(k) !== s.codePointAt(i-1)) {
      k = pi[k]
    }
    pi[i] = ++k
  }

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
