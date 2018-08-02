/**
 * @param {number} N
 * @return {number}
 */
const countArrangement = N => {
  /*
     idea: a search should be good enough
   */
  /*
     used[i] to see if number i is already used.
     note that we are using 1-based index here for performance
   */
  const used = new Uint8Array(N+1)
  let ans = 0
  const search = i => {
    if (i === N + 1) {
      ++ans
      return
    }
    for (let num=1; num <= N; ++num) {
      if (
        used[num] === 0 &&
        (num % i === 0 || i % num === 0)
      ) {
        used[num] = 1
        search(i+1)
        used[num] = 0
      }
    }
  }
  search(1)
  return ans
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(countArrangement)
f(2)(2)
f(11)(750)
f(15)(24679)
