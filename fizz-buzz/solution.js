/**
 * @param {number} n
 * @return {string[]}
 */
const fizzBuzz = n => {
  /*
     idea: just follow the rule.

     it's an interesting problem in a sense that
     any attempt of generalizing it would most likely
     end up being wrong or slowing it down.

   */
  const xs = []
  for (let i = 1; i <= n; ++i) {
    if (i % 3 === 0) {
      if (i % 5 === 0) {
        xs.push("FizzBuzz")
      } else {
        xs.push("Fizz")
      }
    } else if (i % 5 === 0) {
      xs.push("Buzz")
    } else {
      xs.push(String(i))
    }
  }
  return xs
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(fizzBuzz)
f(30)(
  [
    "1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz",
    "11","Fizz","13","14","FizzBuzz","16","17","Fizz","19",
    "Buzz","Fizz","22","23","Fizz","Buzz","26","Fizz","28","29",
    "FizzBuzz"
  ]
)
