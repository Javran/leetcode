/**
 * @param {string} A
 * @param {string} B
 * @return {boolean}
 */
const buddyStrings = (A, B) => {
  // O(n^2) is straightforward, while O(n) is all of boring details

  // rule out strings of diff len
  if (A.length !== B.length) {
    return false
  }
  const freqs = new Int16Array(26).fill(0)
  for (let i = 0; i < A.length; ++i)
    ++freqs[A.codePointAt(i) - 97 /* 'a' */]
  // freq count & see if there are duplicated chars
  // this is to allow a string to be buddy string of itself
  // by swaping two char of the same.
  const hasDup = freqs.some(x => x >= 2)
  if (A === B) {
    return hasDup
  }
  // subtract from the other string, so we can test whether
  // the whole array is empty after this.
  for (let i = 0; i < B.length; ++i)
    --freqs[B.codePointAt(i) - 97 /* 'a' */]
  // when freq count differs, swaping cannot solve the problem.
  if (freqs.some(x => x !== 0))
    return false

  let diffCount = 0
  for (let i = 0; i < A.length && diffCount <= 2; ++i) {
    if (A[i] !== B[i])
      ++diffCount
  }
  return diffCount === 2
}

console.assert(buddyStrings("aa", "aa"))
console.assert(!buddyStrings("ac", "ba"))
console.assert(buddyStrings("ac", "ca"))
console.assert(!buddyStrings("aa", "aaa"))
console.assert(!buddyStrings("ab", "ab"))
