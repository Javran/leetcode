/*
   end up having the same things as:
   https://leetcode.com/problems/remove-duplicate-letters/discuss/76762/Java-O(n)-solution-using-stack-with-detail-explanation
   credits to yfcheng.
 */

/**
 * @param {string} s
 * @return {string}
 */
const removeDuplicateLetters = s => {

  const xs = new Int8Array(s.length)
  // frequency count
  const count = new Int16Array(26).fill(0)
  const ans = []
  for (let i = 0; i < s.length; ++i) {
    const p = s.codePointAt(i) - 97
    xs[i] = p
    ++count[p]
  }
  xs.map(code => {
    // removing current char
    --count[code]
    if (ans.indexOf(code) === -1) {
      while (ans.length > 0) {
        const ansLast = ans[ans.length-1]
        // for ansLast > code, we have discovered a potential point
        // where we can have a lexically lower solution
        // if removing ansLast from current answer set
        // does not leave us with an "incomplete" answer
        // (in other words, this removed value should still be
        // present somewhere in the part we have not yet visited.)
        if (ansLast > code && count[ansLast] > 0)
          ans.pop()
        else
          break
      }
      ans.push(code)
    }
  })
  return String.fromCodePoint.apply(null,ans.map(x => x + 97))
}

console.log(removeDuplicateLetters("bcacccbztab"))
console.log(removeDuplicateLetters("bcabc"))
console.log(removeDuplicateLetters("bcacb"))
