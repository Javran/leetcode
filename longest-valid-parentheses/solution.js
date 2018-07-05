/**
 * @param {string} s
 * @return {number}
 */
const longestValidParentheses = s => {
  // let f[i] be the longest well-formed parentheses string
  // ending at i.
  const f = new Uint32Array(s.length)
  let ans = 0
  // f[0] = 0, no need of initialization
  for (let i = 1; i < s.length; ++i) {
    if (s.codePointAt(i) === 40 /* '(' */)
      // no well-formed string can end with '('
      continue
    // prev position: i-1
    // first position for previous solution: i-1-f[i-1]+1 => i-f[i-1]
    // we need to confirm that s[i-f[i-1]-1] is '('
    // incidentally this works when f[i-1] is 0
    if (s.codePointAt(i-f[i-1]-1) === 40) {
      f[i] = f[i-1] + 2
      // try inheriting from previous solutions
      // this is to deal with "(....)(....)" patterns, where
      // concatenating two valid solutions gives us a larger one.
      if (i-f[i-1]-2 >= 0)
        f[i] += f[i-f[i-1]-2]
      if (ans < f[i])
        ans = f[i]
    }
  }
  return ans
}

console.assert(longestValidParentheses("(()") === 2)
console.assert(longestValidParentheses("((())))") === 6)
console.assert(longestValidParentheses("(()()())") === 8)
console.assert(longestValidParentheses("(()(()())())") === 12)
console.assert(longestValidParentheses(")()())") === 4)
// this problem seems to ask for *consecutive* well-formed parentheses,
// as "(()(()" gives 2, instead of recognizing "()()", which is 4.
console.assert(longestValidParentheses("(()(()") === 2)
