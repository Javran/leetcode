/**
 * @param {number} x
 * @return {boolean}
 */
const isPalindrome = x => {
  if (x < 0)
    return false
  if (x === 0)
    return true
  const s = String(x)
  for (let i = 0, j = s.length - 1; i < j; ++i, --j)
    if (s.codePointAt(i) !== s.codePointAt(j))
      return false
  return true
}
