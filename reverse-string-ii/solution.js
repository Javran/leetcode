/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
const reverseStr = (s, k) => {
  /*
     idea: things become easier once we realize
     we just need to split the input string into group of k,
     and then reverse every other group.
   */

  /*
     like "String Builder" or similar concepts in other languages,
     it helps if we maintain a collection of strings and ask standard lib
     to concatenate them for us.

     thinks about what happens for ((a+b)+c)+d where a,b,c,d are all strings,
     things like string builders will avoid creation of intermediate string values
     therefore the speedup
   */
  const ansArr = []
  for (let i = 0, rev = true; i < s.length; i += k, rev = !rev) {
    // current group
    const cur = s.substring(i, i+k)
    // whether this group needs reversing
    ansArr.push(rev ? cur.split('').reverse().join('') : cur)
  }
  return ansArr.join('')
}

const {cTestFunc} = require('leetcode-zwischenzug')
const f = cTestFunc(reverseStr)

f("abcd", 1)("abcd")
f("abcdefg", 2)("bacdfeg")
f("abcdefg", 3)("cbadefg")
f("abcd", 9)("dcba")
f("abcdefgh", 3)("cbadefhg")
