/**
 * @param {number[]} nums
 * @return {boolean}
 */
const containsDuplicate = nums => {
  /*
     as there isn't any useful constraint on input,
     we cannot do any better than O(n lg n) in which
     lg n is the time of accessing our set.
   */
  if (nums.length <= 1)
    return false
  const s = new Set()
  for (let i = 0; i < nums.length; ++i) {
    const n = nums[i]
    if (s.has(n)) {
      return true
    } else {
      s.add(n)
    }
  }
  return false
}
