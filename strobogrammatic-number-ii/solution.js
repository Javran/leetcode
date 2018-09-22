const sMids = ['0', '1', '8']

const sPairs = [[0,0], [1,1], [6,9], [8,8], [9,6]]

/**
 * @param {number} n
 * @return {string[]}
 */
const findStrobogrammatic = n => {
  /*
     idea:

     - every digit of the number will have a fixed set of values to pick from,
       namely 0,1,6,8,9

     - we just need to generate half of the number and rest of it will be clear

     - in the event that we are require to generate numbers of odd length,
       we need to have some number in the middle, which can only be picked
       from 0,1,8

     - keep it in mind that first value cannot be 0.

   */

  // having special cases for 0 and 1 simplifies rest of the impl.
  if (n === 0)
    return ['']
  if (n === 1)
    return sMids

  const half = n >>> 1
  const ans = []
  const cur = new Int8Array(n)

  const build = dep => {
    if (dep === half) {
      if (n & 1) {
        [0,1,8].forEach(m => {
          cur[half] = m
          ans.push(cur.join(''))
        })
        // odd length needs middle value
      } else {
        ans.push(cur.join(''))
      }
      return
    }
    for (let i = 0; i < sPairs.length; ++i) {
      const [a,b] = sPairs[i]
      if (a === 0 && dep === 0)
        continue
      cur[dep] = a
      cur[n-1-dep] = b
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
f(6)()
