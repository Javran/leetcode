const memo = []

/**
 * @param {number} n
 * @return {number}
 */
const numTrees = n => {
  if (n <= 1)
    return 1
  if (n in memo)
    return memo[n]
  let ans = 0
  for (let i = 1; i <= n; ++i) {
    /*
       now we need to make "i" current root, which means
       we have "1..i-1" on left and "i+1..n" on right (1-based index)
     */
    const lResult = numTrees(i-1)
    const rResult = numTrees(n-i)
    ans += lResult * rResult
  }
  memo[n] = ans
  return ans
}

const {cTestFunc} = require('leetcode-zwischenzug')
const f = cTestFunc(numTrees)
f(0)(1)
f(1)(1)
f(2)(2)
f(12)(208012)
f(20)(6564120420)
