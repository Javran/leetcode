/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const search = (nums, target) => {
  if (nums.length === 0)
    return -1
  if (nums.length === 1)
    return nums[0] === target ? 0 : -1
  /*
     idea: two cases:

     case 1:
       if the array is not rotated at all, we'll know this by seeing nums[0] < nums[N-1]

     case 2:
       if the array is rotated, we want to find an index 0 < cut <= N-1 so that nums[cut-1] > nums[cut],
       in this case we have two sorted subarrays: nums[0..cut-1] and nums[cut..N-1]
       `cut > 0` is just to avoid checking bounds about cut-1, which can be easily done by only
       work on array who contains more than one element.

   */
  const N = nums.length
  // assuming nums[lInit .. rInit] is sorted, find target in it.
  const binSearch = (lInit, rInit) => {
    let l = lInit, r = rInit
    while (l <= r) {
      const mid = (l+r) >>> 1
      if (nums[mid] === target)
        return mid
      if (nums[mid] < target) {
        l = mid+1
      } else {
        // nums[mid] > target
        r = mid-1
      }
    }
    return -1
  }

  if (nums[0] < nums[N-1])
    return binSearch(0, N-1)
  // find 0 < cut <= N-1, in which nums[cut-1] > nums[cut]
  let l = 1, r = N-1, cut
  while (l <= r) {
    const mid = (l+r) >>> 1
    if (nums[mid-1] > nums[mid]) {
      cut = mid
      break
    }
    if (nums[mid] <= nums[N-1]) {
      r = mid-1
    } else {
      l = mid+1
    }
  }
  // [0 .. cut-1] and [cut .. N-1] are both sorted
  if (target === nums[0])
    return 0
  return target > nums[0] ? binSearch(0,cut-1) : binSearch(cut,N-1)
}


const {consoleTest} = require('leetcode-zwischenzug')
const t = consoleTest(search)
t([4,5,6,7,0,1,2],0)(4)
t([4,5,6,7,0,1,2],3)(-1)
t([1,2,3],3)(2)
t([1,2,3,4],2)(1)
t([5,6,7,8,-1,0,2,4],3)(-1)
t([5,6,7,8,-1,0,2,4],2)(6)
t([5,6,7,8,-1,0,2,4],8)(3)
t([5,6,7,8,-1,0,2,4],6)(1)
t([5,6,7,8,-1,0,2,4],4)(7)
