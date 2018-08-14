/**
 * @param {string} s
 * @return {number}
 */
const romanToInt = s => {
  /*
     idea: a key observation is that
     unlike decimal numbers, every roman number unit is irrelevant
     to their places in that number when we are just talking about figuring out the number.

     by "number unit" I mean we should consider things like "IV", "IX" as wholes
     rather than taking the full string into account at once.

     this suggests that we build a parser which looks one position ahead to see if a "I" turns out
     to be "IV", "IX" or just a regular "I".

   */
  const N = s.length
  let i = 0
  // parse next number until we are done
  const next = () => {
    if (i >= N)
      return null
    /*
       you might think the logic looks a bit messy,
       but I guess this is the best we can do
       given that roman numeric system is not the most decent one in the world...
     */
    if (s[i] === 'I') {
      if (s[i+1] === 'V') {
        i += 2
        // IV
        return 4
      }
      if (s[i+1] === 'X') {
        i += 2
        // IX
        return 9
      }
      // I
      i += 1
      return 1
    }
    if (s[i] === 'X') {
      if (s[i+1] === 'L') {
        i += 2
        // XL
        return 40
      }
      if (s[i+1] === 'C') {
        i += 2
        // XC
        return 90
      }
      // X
      i += 1
      return 10
    }
    if (s[i] === 'C') {
      if (s[i+1] === 'D') {
        i += 2
        // CD
        return 400
      }
      if (s[i+1] === 'M') {
        i += 2
        // CM
        return 900
      }
      // C
      i += 1
      return 100
    }
    if (s[i] === 'V') {
      i += 1
      return 5
    }
    if (s[i] === 'L') {
      i += 1
      return 50
    }
    if (s[i] === 'D') {
      i += 1
      return 500
    }
    if (s[i] === 'M') {
      i += 1
      return 1000
    }
    throw `unexpected char: ${s[i]}`
  }
  let ans = 0
  while (true) {
    const cur = next()
    if (cur === null)
      return ans
    ans += cur
  }
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(romanToInt)
f("III")(3)
f("IV")(4)
f("IX")(9)
f("LVIII")(58)
f("MCMXCIV")(1994)
