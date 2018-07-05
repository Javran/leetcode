/**
 * @param {number[]} nums
 * @return {number}
 */
const firstMissingPositive = nums => {
  /*
     observation: we know the answer will be in range (1, nums.length+1),
     as the extreme case will be that nums being a permutation of
     [1..nums.length] and we have to use nums.length + 1

     one step further: every value outside of this range is irrelevant to the answer.

     now that if we move every value v (inside [1..nums.length] of course)
     to nums[v-1], we can then do a scan to find the first violation of
     "nums[i-1] === i", and i should be the final answer.
   */
  const doSwap = i => {
    const v = nums[i]
    if (v < 1 || v > nums.length)
      return
    if (nums[v-1] !== v && i !== v-1) {
      // swap ind i and ind v-1
      nums[i] = nums[v-1]
      nums[v-1] = v
      doSwap(i)
    }
  }

  for (let i = 0; i < nums.length; ++i)
    doSwap(i)
  for (let i = 0; i < nums.length; ++i) {
    if (nums[i] !== i+1) {
      return i+1
    }
  }
  // at this point nums can only be [1,2,3,...,nums.length]
  return nums.length+1
}

console.assert(firstMissingPositive([1,2,0]) === 3)
console.assert(firstMissingPositive([3,4,-1,1]) === 2)
console.assert(firstMissingPositive([7,8,9,11,12]) === 1)
console.assert(firstMissingPositive([1,9,2,8,3,7,4,6,5]) === 10)
