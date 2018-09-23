/**
 * @param {number[]} nums
 * @param {number} n
 * @return {number}
 */
const minPatches = (nums, n) => {
  /*
     idea:

     if we can build all numbers from [0 .. n-1],
     then encountering a new number x will allow us to build [x .. n+x-1]

     - when x <= n, we can happily extend our "representable range" to [0 .. n+x-1]
     - otherwise, we don't have a way to represent n, in which case
       we might as well add n to the array, which is because
       x is the smallest value we cannot represent

     so yes, there is actually no decision to this is just a matter of
     simulation.
   */
  let ans = 0
  let miss = 1
  let i = 0
  // INVARIANT: we can represent all nums in [0..miss-1]
  while (miss <= n) {
    if (i < nums.length) {
      const now = nums[i]
      if (now <= miss) {
        ++i
        miss += now
      } else {
        /*
           using *2 instead because these flipping bastard just
           want you to fail.
           well, flip. you.
         */
        // miss <<= 1
        miss *= 2
        ++ans
      }

    } else {
      miss *= 2
      ++ans
    }
  }
  return ans
}

const {cTestFunc, genInt} = require('leetcode-zwischenzug')
const f = cTestFunc(minPatches)

f([1,3],6)(1)
f([1,5,10],20)(2)
f([1,2,2],5)(0)

const gen = () => {
  const xs = []
  let cur = 0
  for (let i = 0; i < 100; ++i) {
    cur += genInt(1, 20)
    xs.push(cur)
  }
  console.log(JSON.stringify(xs))
}

f(
  [5,16,17,22,27,33,43,57,68,86,97,105,107,126,135,136,155,171,182,198,214,221,229,244,247,256,267,268,270,272,279,284,299,308,318,336,345,359,363,365,383,394,398,411,423,424,440,458,473,480,486,490,510,529,540,556,573,579,592,599,615,635,646,657,661,678,690,691,703,716,735,754,767,782,798,809,818,829,836,843,859,862,864,873,888,889,905,924,937,938,949,957,959,973,979,983,991,999,1014,1030],
  5000
)(4)

// some problem setter prefers being a dick rather than caring about the approach
f([1,2,31,33], 2147483647)(28)
