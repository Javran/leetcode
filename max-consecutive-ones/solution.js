/**
 * @param {number[]} nums
 * @return {number}
 */
const findMaxConsecutiveOnes = nums => {
  let ans = 0
  let i = 0
  // take consecutive 1s and consecutive 0s, keep track of length,
  // as simple as that.
  while (i < nums.length) {
    if (nums[i]) {
      let j = i
      // =1, find consecutive 1s
      while (j+1 < nums.length && nums[j+1] === 1)
        ++j
      const newAns = j-i+1
      if (newAns > ans)
        ans = newAns
      i = j+1
    } else {
      // =0, skipping
      while (i+1 < nums.length && !nums[i+1])
        ++i
      // next
      ++i
    }
  }
  return ans
}

console.log(findMaxConsecutiveOnes([0,1,1,0,1,1,0,0,0,1,1]))
