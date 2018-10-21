const toKey = xs => {
  const es = []
  const os = []
  for (let i = 0; i < xs.length; i += 2) {
    es.push(xs[i])
  }
  for (let i = 1; i < xs.length; i += 2) {
    os.push(xs[i])
  }
  es.sort()
  os.sort()
  return `${es.join('')}|${os.join('')}`
}

/**
 * @param {string[]} A
 * @return {number}
 */
const numSpecialEquivGroups = A => {
  const groups = new Map()
  for (let i = 0; i < A.length; ++i) {
    const xs = A[i]
    const key = toKey(xs)
    if (groups.has(key)) {
      groups.get(key).push(xs)
    } else {
      groups.set(key, [xs])
    }
  }
  return groups.size
}

const {cTestFunc} = require('leetcode-zwischenzug')
const f = cTestFunc(numSpecialEquivGroups)
f(["a","b","c","a","c","c"])(3)
f(["aa","bb","ab","ba"])(4)
f(["abc","acb","bac","bca","cab","cba"])(3)
f(["abcd","cdab","adcb","cbad"])(1)
