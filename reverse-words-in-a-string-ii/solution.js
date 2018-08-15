/**
 * @param {character[]} str
 * @return {void} Do not return anything, modify str in-place instead.
 */
const reverseWords = xs => {
  /*
     idea: first reverse the whole array by char,
     then for each word separated by whitespaces,
     we reverse them again. this produces the net effect of
     reversing words while preserving their character orderings.
   */
  const N = xs.length
  if (N <= 1)
    return
  const doRev = (l,r) => {
    for (/* NOOP */; l < r; ++l, --r) {
      const tmp = xs[l]
      xs[l] = xs[r]
      xs[r] = tmp
    }
  }
  doRev(0,N-1)
  for (let startInd = 0; startInd < N; /* */) {
    let endInd = startInd
    while (endInd+1 < N && xs[endInd+1] !== ' ') {
      ++endInd
    }
    doRev(startInd,endInd)
    startInd = endInd+2
  }
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(function testReverseWord(xs) {
  reverseWords(xs)
  return xs
})

f(["t","h","e"," ","s","k","y"," ","i","s"," ","b","l","u","e"])(
  ["b","l","u","e"," ","i","s"," ","s","k","y"," ","t","h","e"]
)
f("abc".split(""))("abc".split(""))
f("aa bb cc".split(""))(("cc bb aa").split(""))
