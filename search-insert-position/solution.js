/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const searchInsert = (nums, target) => {
  /* idea: binary search */
  let l = 0, r = nums.length-1
  let mid
  while (l <= r) {
    mid = (l+r) >> 1
    if (nums[mid] === target) {
      return mid
    } else if (target > nums[mid]) {
      l = mid + 1
    } else {
      // target < nums[mid]
      r = mid - 1
    }
  }
  // note that if we squeeze to an empty range,
  // that means r-1 === l, at which point l is the right position to go.
  return l
}

console.assert(searchInsert([1,3,5,6], 0) === 0)
console.assert(searchInsert([1,3,5,6], 1) === 0)
console.assert(searchInsert([1,3,5,6], 2) === 1)
console.assert(searchInsert([1,3,5,6], 6) === 3)
console.assert(searchInsert([1,3,5,6], 7) === 4)
console.assert(searchInsert([1,3], 1) === 0)
