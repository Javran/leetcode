/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
const fourSum = (numsInp, target) => {
  if (numsInp.length <= 3) {
    return []
  }
  if (numsInp.length === 4) {
    return (numsInp.reduce((x,y) => x+y) === target) ? [numsInp] : []
  }
  // we at least have 5 nums to work with.
  numsInp.sort((x,y) => x-y)
  // limitting every number to have at most 4 copies
  // since there's no point keeping more than 4 copies of the same num
  // this allows finding next different number in constant time
  // in situations where many same numbers are heavily duplicated
  const nums = []
  for (let i = 0; i < numsInp.length; ++i) {
    if (numsInp[i-4] !== numsInp[i])
      nums.push(numsInp[i])
  }
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
      nums.length-i >= 3-dep;
      ++i
    ) {
      const n = nums[i]
      if ((4-dep)*n > currentTarget)
        // overshooting, no point in proceeding.
        break

      cur[dep] = n
      search(dep+1, i+1, currentTarget-n)
      // find next i, which must differ from current value
      while (
        //    nums.length - (i+1) >= 3-dep
        // >> nums.length - i >= 4 - dep
        nums.length-i >= 4-dep &&
        nums[i+1] === n
      )
        ++i
      // ++i in for loop should bring us to next right place.
    }
  }
  search(0,0,target)
  return ans
}

console.log(fourSum([1, 0, -1, 0, -2, 2], 0))
console.log(fourSum([1,1,1,1,1,2,2,2,2,2,2,3,3,3,3,4,4,4,4,4,4,4,5,6,6,7,7,7], 12))
