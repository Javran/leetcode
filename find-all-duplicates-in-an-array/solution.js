/**
 * @param {number[]} nums
 * @return {number[]}
 */
const findDuplicates = nums => {
  // apparently "no extra space" means to use input array
  // can someone stop doing this bs?

  /*
     1 <= element value <= n

     if we make sure that
     nums[v-1] === v where v is a element of the array (whenever possible)
     we should be able to detect all dups

   */
  const ans = []
  const doSwap = ind => {
    const v = nums[ind]
    if (v-1 !== ind && nums[v-1] === v) {
      if (ans.indexOf(v) === -1)
        ans.push(v)
    }
    if (nums[v-1] !== v && v-1 !== ind) {
      const tmp = nums[v-1]
      nums[v-1] = nums[ind]
      nums[ind] = tmp
      doSwap(ind)
    }
  }

  for (let i = 0; i < nums.length; ++i) {
    const v = nums[i]
    doSwap(i)
  }

  return ans
}

console.log(findDuplicates([1,2,3,5,3,5]))
console.log(findDuplicates([3,11,8,16,4,15,4,17,14,14,6,6,2,8,3,12,15,20,20,5]))
