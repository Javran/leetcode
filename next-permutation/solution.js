/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const nextPermutation = nums => {
  if (!Array.isArray(nums) || nums.length <= 1)
    return

  // find the longest non-decreasing sequence starting from right side
  // note that this sequence cannot be empty as a singleton array meets the requirement.
  let revBegin = nums.length - 1
  while (
    revBegin - 1 >= 0 &&
    nums[revBegin-1] >= nums[revBegin]
  )
    --revBegin

  // when the full seq is non-decreasing, we can simply reverse it.
  if (revBegin === 0) {
    nums.reverse()
    return
  }

  // otherwise we have some element which breaks the "non-decreasing"-ness
  // of nums.length-1 down to revBegin, in which case we just need to
  // find the successor to this value from this non-decreasing sequence range
  // and swap them
  for (let i = nums.length; i >= 0; --i)
    if (nums[i] > nums[revBegin-1]) {
      const tmp = nums[i]
      nums[i] = nums[revBegin-1]
      nums[revBegin-1] = tmp
      break
    }
  // note that this swap preserves the "non-decreasing"-ness.
  // so we can simply reverse this part of the array.
  for (
    let i = revBegin, j = nums.length-1;
    i < j;
    ++i, --j
  ) {
    const tmp = nums[i]
    nums[i] = nums[j]
    nums[j] = tmp
  }
}


const test = xs => {
  console.log(`before: ${xs}`)
  nextPermutation(xs)
  console.log(`after: ${xs}`)
}

test([2,1,2,4,3])
