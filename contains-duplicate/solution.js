/**
 * @param {number[]} nums
 * @return {boolean}
 */
const containsDuplicate = nums => {
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
