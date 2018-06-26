/**
 * @param {number[]} nums
 * @return {number[]}
 */
const findDisappearedNumbers = nums => {
  /*
     hm, honestly I don't feel like mutating input value
     is the best practice and I don't think reusing
     input array is considered O(1) space. but anyways.
   */
  const sz = nums.length
  // plan: use signum for nums[v-1]
  // to mark v as visited
  const markVisited = v => {
    const num = nums[v-1]
    if (num > 0)
      nums[v-1] = -num
  }
  for (let i = 0; i < sz; ++i) {
    const num = nums[i]
    markVisited(num > 0 ? num : -num)
  }
  // now we can even reuse input array to produce the answer
  let ansInd = 0
  for (let i = 0; i < sz; ++i)
    if (nums[i] > 0) {
      // note that ansInd can never be faster than i, we are safe.
      nums[ansInd] = i+1
      ++ansInd
    }
  nums.length = ansInd
  return nums
}
