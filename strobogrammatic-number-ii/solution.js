const sMids = ['0', '1', '8']

const sPairs = [[0,0], [1,1], [6,9], [8,8], [9,6]]

/**
 * @param {number} n
 * @return {string[]}
 */
const findStrobogrammatic = n => {
  if (n === 0)
    return ['']
  if (n === 1)
    return sMids.slice()

  // all possible "middle number"
  const mids = (n & 1) ? sMids : ['']
  const half = n >>> 1
  const ans = []
  const curL = new Array(half)
  const curR = new Array(half)

  const build = dep => {
    if (dep === half) {
      mids.forEach(mid => {
        const result = [
          ...curL.slice(0, half),
          ...mid,
          ...curR.slice(0, half).reverse(),
        ].join('')
        ans.push(result)
      })
      return
    }

    for (let i = 0; i < sPairs.length; ++i) {
      const [a,b] = sPairs[i]
      if (a === 0 && dep === 0)
        continue
      curL[dep] = a
      curR[dep] = b
      build(dep+1)
    }
  }

  build(0)
  return ans
}

const {cTestFunc} = require('leetcode-zwischenzug')
const f = cTestFunc(findStrobogrammatic)

f(1)()
f(3)()
f(4)()
