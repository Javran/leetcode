// subroutine for picking k elements to form the maximum digits
const optimalPick = (xs, k) => {
  let ret = []
  let indBegin = 0
  while (k >= 1) {
    /*
       for picking k, we want to select most significant digit
       by preserving last k-1 numbers.

       (xs.len - 1) - (k-1) + 1 => xs.len-k+1
     */
    const indEnd = xs.length-k
    let maxD = xs[indBegin], maxInd = indBegin
    for (let i = indBegin+1; maxD < 9 && i <= indEnd; ++i) {
      if (xs[i] > maxD) {
        maxD = xs[i]
        maxInd = i
      }
    }
    ret.push(maxD)
    --k
    indBegin = maxInd + 1
  }
  return ret
}

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number[]}
 */
const maxNumber = (xs, ys, k) => {
  /*
     idea: we need to pick u digits from xs and v digits from ys
     where u+v = k. we don't know how to split, but we can try them all.
   */
  let ans = new Array(k).fill(-1)
  const buildFrom = (xs, ys) => {
    // this is the tricky part: given two selected arrays,
    // we need to merge them into the maximum digits we can.
    let i = 0, j = 0, k = 0
    // try to see if curAns is actually larger
    // abort current answer if we have evidence that
    // we won't get anything better.

    /*
       - null: don't know, keep it on
       - true: defintely continue
       - false: stop
     */
    let isGt = null
    const assignAndCheck = newVal => {
      curAns[k] = newVal
      if (isGt !== null)
        return isGt
      if (curAns[k] > ans[k]) {
        isGt = true
        return true
      }
      if (curAns[k] < ans[k]) {
        isGt = false
        return false
      }
      return true
    }
    const curAns = new Array(k)
    while (i < xs.length && j < ys.length) {
      /*
         consider picking from [5,5,4] [5,5,6].
         we cannot always prefer one to tiebreak,
         as in this example this gives us [5,5,5,5,6,4]
         while [5,5,6,5,5,5] is better.

         so what we want is to look forward until the first non-equal
         place is found, and we'll prefer the array that gives
         us greater value, as this allows us to exhaust that array
         faster and therefore allow the larger digit to show
         in front earlier.
       */
      let i1 = i, j1 = j
      while (i1 < xs.length && j1 < ys.length && xs[i1] === ys[j1]) {
        ++i1, ++j1
      }
      /*
         credit to dietpepsi for the condition that I used below.

         - i1 === xs.length && j1 === ys.length, prefer either is fine
           because they are the same
         - i1 < xs.length && j1 < ys.length: prefer xs if xs[i1] > ys[j1]

         - i1 < xs.length && j1 === ys.length
         - i1 === xs.length && j1 < ys.length

           the idea for both cases are: we prefer the longer one,
           this allows element beyond common prefix to show up earlier.
           (consider for example [5,7,6] [5,7])
           prefering the shorter one could move us away from optimal answer,
           so let's prefer the longer one.

           note: I'm still not entirely sure about the reason,
           the discussion here isn't very convincing to myself.
       */
      if (
        j1 === ys.length || (i1 < xs.length && xs[i1] > ys[j1])
      ) {
        if (!assignAndCheck(xs[i]))
          return
        ++i, ++k
      } else {
        if (!assignAndCheck(ys[j]))
          return
        ++j, ++k
      }
    }
    if (i < xs.length) {
      while (i < xs.length) {
        if (!assignAndCheck(xs[i]))
          return
        ++i, ++k
      }
    } else {
      while (j < ys.length) {
        if (!assignAndCheck(ys[j]))
          return
        ++j, ++k
      }
    }
    ans = curAns
  }

  /*
     yLen = k - xLen <= ys.length
     ==> k - ys.length <= xLen
   */
  for (
    let xLen = Math.max(0, k-ys.length), yLen = k-xLen;
    xLen <= k && xLen <= xs.length;
    ++xLen, --yLen
  ) {
    buildFrom(
      optimalPick(xs, xLen),
      optimalPick(ys, yLen)
    )
  }
  return ans
}

const {randomIntGenBetween} = require('leetcode-zwischenzug')
const assert = require('assert')
const genTest = () => {
  const g = randomIntGenBetween(0,9)
  const xs = []
  const ys = []
  for (let i = 0; i < 20; ++i) {
    if (g() > 5)
      xs.push(g())
    if (g() > 5)
      ys.push(g())
  }

  console.log(JSON.stringify(xs))
  console.log(JSON.stringify(ys))
  console.log(xs.length + ys.length)
}

// genTest()

assert.deepEqual(
  maxNumber([3], [9,2,5,8,3], 5),
  [9,5,8,3,3]
)
assert.deepEqual(
  maxNumber([9,1,2,5,8,3], [3,4,6,5], 5),
  [9,8,6,5,3]
)
assert.deepEqual(
  maxNumber([2,5,6,4,4,0], [7,3,8,0,6,5,7,6,2], 15),
  [7,3,8,2,5,6,4,4,0,6,5,7,6,2,0]
)
assert.deepEqual(
  maxNumber([6,3,9,0,5,6], [2,2,5,2,1,4,4,5,7,8,9,3,1,6,9,7,0], 23),
  [6,3,9,2,2,5,2,1,4,4,5,7,8,9,3,1,6,9,7,0,5,6,0]
)

assert.deepEqual(maxNumber([5,7,5,4], [5,7,5], 7), [5,7,5,7,5,5,4])
assert.deepEqual(maxNumber([5,7,5,6], [5,7,5], 7), [5,7,5,7,5,6,5])
