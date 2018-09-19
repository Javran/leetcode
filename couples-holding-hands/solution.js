/**
 * @param {number[]} row
 * @return {number}
 */
const minSwapsCouples = row => {
  /*
     idea:

     see https://leetcode.com/problems/couples-holding-hands/solution/ for a formal proof.

     but let's just say that any move in an optimal solution need to resolve
     at least one couple.

     just play with some examples a bit, you'll notice that
     for an optimal solution, the swap happens only in small cycles:
     for an unresolved position <i, i+1>, figure out the position of the other one j
     (here we pick i+1 for swaping out for simplicity, but i will do as well),
     then swap people at i+1 and j, and repeat this process at <i', i'+1> where
     j === i' or j === i'+1, this form small cycles.

     If we can resolve each cycle individually, we'll solve the problem.
     Now there are two different swaps:

     (1) one that resolves only one couple
     (2) the other that resolves two at a time

     but a closer examination will reveal that the steps are already deterministic
     and we have no decision to make: whenever we can do (2), we'll go for it,
     but the only chance when (2) is available, is when this "swap cycle"
     has reduced to size 2, so swaping makes both couple resolved.

     this suggests we can simply simulate the process
     and count number of swaps

   */
  let ans = 0
  for (let i = 0; i < row.length; i += 2) {
    if ((row[i] ^ row[i+1]) !== 1) {
      ++ans
      // need to swap row[i+1]
      const target = row[i] ^ 1
      for (let k = i+2; k < row.length; ++k) {
        if (row[k] === target) {
          row[k] = row[i+1]
          /*
             assigning to row[j] isn't necessary,
             as we scan through `row` only once
             without looking at all previous values
           */
          // row[i+1] = target
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
