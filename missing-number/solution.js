/**
 * @param {number[]} nums
 * @return {number}
 */
const missingNumber = ns => {
  /*
     n distinct numbers taken from 0, 1, ..., n sum up to T = n*(n+1)/2.
     there is exactly one missing number, which can be computed by subtracting
     array sum from T.
   */
  const N = ns.length
  return N*(N+1)/2 - ns.reduce((x,y) => x+y, 0)
}
