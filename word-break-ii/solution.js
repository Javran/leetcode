/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
const wordBreak = (s, wordDict) => {
  // was getting TLE.
  // just make sure that the prevDp is "reachable" and that should be it.
  const dp = new Array(s.length)
  // the actual value of dp[0] is not being used.
  // it's just kept this way to mark it as "reachable"
  dp[0] = [[{prev: null, word: null}]]
  for (let i = 1; i <= s.length; ++i) {
    const curDp = []
    dp[i] = curDp
    for (let j = 0; j < wordDict.length; ++j) {
      const word = wordDict[j]
      if (
        i - word.length >= 0 &&
        // only derive from "reachable" previous states
        dp[i-word.length].length > 0 &&
        // to make sure we can match this part of the string
        s.substr(i-word.length, word.length) === word
      ) {
        curDp.push({prev: i - word.length, word})
      }
    }
  }

  const ans = []
  const st = []
  const backtrack = ind => {
    if (ind === 0) {
      ans.push(st.join(' '))
      return
    }
    for (let i = 0; i < dp[ind].length; ++i) {
      const {prev, word} = dp[ind][i]
      st.unshift(word)
      backtrack(prev)
      st.shift()
    }
  }
  backtrack(s.length)
  return ans
}

console.log(wordBreak("catsanddog", ["cat", "cats", "and", "sand", "dog"]))
console.log(wordBreak("pineapplepenapple", ["apple", "pen", "applepen", "pine", "pineapple"]))

const xs = new Array(1000).fill('a').join('')
const ys = [1,2,3,4,5,6,7].map(x => new Array(x).fill('a').join(''))
// console.log(wordBreak(xs, ys))
console.log(wordBreak(xs + 'b', ys))
console.log(wordBreak('b' + xs, ys))
