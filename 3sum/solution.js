/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const threeSum = nums => {
  // sorting gives nice invariants that we can use
  nums.sort((x,y) => x - y)

  const pairs = []
  const pairFound = (a,b) => pairs.push([a,b,-a-b])

  /*

     to get a+b+c=0 for some a,b,c we have 3 cases:
     - (1) a,b,c are all the same number: the only solution to a+a+a = 0 is a = 0,
       so when we found 0, we simply add 0 into the list

     - (2) a,b,c are 3 unique numbers

     - (3) a,b,c has two duplicates

   */

  const uniqNumsSet = new Set()
  let zeroCount = 0
  const dups = []

  for (let i = 0; i < nums.length; ++i) {
    const num = nums[i]
    if (num === 0)
      ++zeroCount;
    if (uniqNumsSet.has(num)) {
      // we have seen this number before.
      if (num !== 0 && (dups.length === 0 || dups[dups.length-1] !== num))
        dups.push(num)
    } else {
      uniqNumsSet.add(num)
    }
  }
  // (1) looking for 3 zeros (as it is sorted, it has to be consecutive)
  if (zeroCount >= 3)
    pairFound(0,0)

  // as Set maintains insertion order, it is safe spreading it.
  const uniqNums = [...uniqNumsSet.values()]
  // (2) looking for a+b+c=0 where a != b, b != c, c != a
  for (let i = 0; i < uniqNums.length; ++i) {
    const a = uniqNums[i]
    for (let j = i+1; j < uniqNums.length; ++j) {
      const b = uniqNums[j]
      const c = -a-b
      if (c <= a || c <= b)
        continue
      if (uniqNumsSet.has(c))
        pairFound(a,b)
    }
  }

  // (3) duplicated nums
  for (let i = 0; i < dups.length; ++i) {
    const num = dups[i]
    const c = -num-num
    if (uniqNumsSet.has(c)) {
      if (c > num) {
        // num = num < c
        pairFound(num, num)
      } else {
        // c < num = num
        pairFound(c, num)
      }
    }
  }

  return pairs
}

console.log(threeSum([-1, 0, 1, 2, -1, -4]))
console.log(threeSum([-1, 0, 1, 2, -1,0, -4,0,0]))
console.log(threeSum([-1,-1,-1,-1, 1,1,1,1,1,3,4,4,4,4,4,5,5,5,5,-2,-2,7,7,8,9,9,-5]))
console.log(threeSum([0,0,0,0,0,0,0,0]))
