/**
 * @param {string} A
 * @param {string} B
 * @return {boolean}
 */
const rotateString = (A, B) => {
  // given that the length of both A and B cannot exceed 100,
  // it is sufficient to simply brute force the offset.
  if (A.length !== B.length)
    return false
  const len = A.length
  if (len === 0)
    return true

  for (let offset = 0; offset < len; ++offset) {
    let flag = true
    for (let i = 0; i < len && flag; ++i)
      if (A[i] !== B[(i+offset) % len])
        flag = false

    if (flag)
      return true
  }
  return false
}

console.assert(rotateString("", "") === true)
console.assert(rotateString("abc", "abc") === true)
console.assert(rotateString("abc", "bca") === true)
console.assert(rotateString("abcabcabccc", "ccabcabcabc") === true)
console.assert(rotateString("abcazcabccc", "ccazcabcabc") === false)
