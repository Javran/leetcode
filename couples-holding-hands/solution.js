/**
 * @param {number[]} row
 * @return {number}
 */
const minSwapsCouples = row => {
  let ans = 0
  for (let i = 0, j = 1; j < row.length; i += 2, j += 2) {
    if ((row[i] ^ row[j]) !== 1) {
      ++ans
      // need to swap row[j]
      const target = row[i] ^ 1
      for (let k = j + 1; k < row.length; ++k) {
        if (row[k] === target) {
          row[k] = row[j]
          row[j] = target
          break
        }
      }
    }
  }
  return ans
}

const {cTestFunc, genInt} = require('leetcode-zwischenzug')
const f = cTestFunc(minSwapsCouples)

f([0,2,1,3])(1)
f([3,2,0,1])(0)
f(
  [42,58,1,5,12,46,17,27,56,44,34,24,54,14,16,26,59,20,9,57,13,37,49,28,7,8,45,29,30,2,25,36,32,51,55,0,22,19,43,21,23,10,48,18,35,52,53,4,41,38,31,6,3,47,39,11,33,40,50,15]
)(27)
f(
  [14,17,22,58,35,30,33,51,46,5,9,16,41,29,43,53,27,31,10,38,52,15,0,2,19,47,18,49,6,11,24,7,32,57,34,40,59,39,8,12,54,20,28,26,4,23,21,55,50,37,1,25,42,44,56,48,3,45,36,13]
)(27)

const gen = () => {
  const N = 30
  const xs = []
  for (let i = 0; i < N*2; ++i) {
    xs[i] = i
  }
  for (let i = 0; i+1 < xs.length; ++i) {
    const j = genInt(i,xs.length-1)
    if (i !== j) {
      const tmp = xs[i]
      xs[i] = xs[j]
      xs[j] = tmp
    }
  }
  console.log(JSON.stringify(xs))
}

// gen()
