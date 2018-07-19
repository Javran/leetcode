/**
 * @param {string} s
 * @return {boolean}
 */
const repeatedSubstringPattern = s =>
  /*
     credit to rsrs3 for this one, see:
     - https://leetcode.com/problems/repeated-substring-pattern/discuss/94334/Easy-python-solution-with-explaination
     it's easy to show that it works when string indeed repeats itself,
     but I have trouble understanding why it works when the answer is supposed to be false.
     TODO: I believe this is true but now there is a solid proof missing.
   */
  (s + s).substr(1, s.length*2-2).indexOf(s) !== -1

console.assert(repeatedSubstringPattern("abcabcabc"))
console.assert(!repeatedSubstringPattern("abcabcabcaba"))
console.assert(repeatedSubstringPattern("abaaba"))
console.assert(repeatedSubstringPattern("aa"))
console.assert(!repeatedSubstringPattern("a"))
console.assert(!repeatedSubstringPattern("abac"))
console.assert(!repeatedSubstringPattern("ab"))
console.assert(repeatedSubstringPattern("aaaaaa"))
