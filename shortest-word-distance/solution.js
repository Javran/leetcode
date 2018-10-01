/**
 * @param {string[]} words
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
const shortestDistance = (words, word1, word2) => {
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
