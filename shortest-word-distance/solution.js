/**
 * @param {string[]} words
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
const shortestDistance = (words, word1, word2) => {
  /*
     idea: for each word we can maintain a set of indices about words
     to indicate places where a word is present, `word1` and `word2`
     respectively define two set of indices and we just need the min difference
     when picking one element from one set and another one from another set.
   */
  const posMap = new Map()
  words.forEach((word, ind) => {
    if (posMap.has(word)) {
      posMap.get(word).push(ind)
    } else {
      posMap.set(word, [ind])
    }
  })

  const xs = posMap.get(word1)
  const ys = posMap.get(word2)
  let min = +Infinity
  /*
     note that every value of posMap is actually a sorted Array,
     we can definitely use this property to speed up our search
     but here it sounds like this O(n^2) will just be good enough
   */
  for (let i = 0; i < xs.length; ++i) {
    for (let j = 0; j < ys.length; ++j) {
      const cur = Math.abs(xs[i] - ys[j])
      if (cur < min)
        min = cur
    }
  }
  return min
}

const {cTestFunc} = require('leetcode-zwischenzug')
const f = cTestFunc(shortestDistance)
const xs = ["practice", "makes", "perfect", "coding", "makes"]
f(xs, "coding", "practice")(3)
f(xs, "makes", "coding")(1)
