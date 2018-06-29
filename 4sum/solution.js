/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
const fourSum = (nums, target) => {
  if (nums.length <= 3) {
    return []
  }
  if (nums.length === 4) {
    return (nums.reduce((x,y) => x+y) === target) ? [nums] : []
  }
  // we at least have 5 nums to work with.
  nums.sort((x,y) => x-y)
  const ans = []
  const cur = new Array(4)
  const search = (dep, startInd, currentTarget) => {
    if (dep === 3) {
      // 3 nums are ready, looking for last one.
      let l = startInd, r = nums.length-1
      while (l <= r) {
        const mid = (l + r) >> 1
        if (nums[mid] === currentTarget) {
          cur[3] = currentTarget
          ans.push(cur.slice(0,4))
          break
        } else if (nums[mid] < currentTarget) {
          l = mid+1
        } else {
          r = mid-1
        }
      }
      return
    }
    // at depth `dep`, `dep` values have been determined.
    // we should at least have `4-dep` candidates remaining for picking
    // namely for a valid i:
    //    nums.length - i + 1 >= 4-dep
    // >> nums.length - i     >= 3-dep
    for (
      let i = startInd;
      nums.length - i >= 3-dep;
      /* NOOP */
    ) {
      const n = nums[i]
      cur[dep] = n
      // overshooting
      if ((4-dep)*n > currentTarget)
        break
      search(dep+1, i+1, currentTarget-n)
      // find next i, which must differ from current value
      while (
        nums.length - (i+1) >= 3-dep &&
        nums[i+1] === n
      )
        ++i
      ++i
    }
  }
  search(0,0,target)
  return ans
}

console.log(fourSum([1, 0, -1, 0, -2, 2], 0))
