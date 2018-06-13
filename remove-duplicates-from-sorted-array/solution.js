/**
 * @param {number[]} nums
 * @return {number}
 */
const removeDuplicates = nums => {
  if (!Array.isArray(nums) || nums.length <= 1)
    return
  let tgt = 1;
  for (let src = 1; src < nums.length; ++src) {
    if (nums[src-1] !== nums[src]) {
      if (src !== tgt)
        nums[tgt] = nums[src]
      // don't worry about overlapping,
      // as both pointers are bumped immediately
      ++tgt
    }
  }
  return tgt
}

const test = xs => {
  const ys = [...xs]
  console.log(xs)
  removeDuplicates(ys)
  console.log(ys)
}

test([0,0,1,1,1,2,2,3,3,4])
test([1,1,2])
test([1,1,1,1,1])
test([1,2,3])
