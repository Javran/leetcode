/**
 * @param {number[]} nums
 * @return {number}
 */
const jump = nums => {
  if (nums.length === 1)
    return 0

  const N = nums.length
  const target = N - 1

  let beginInd = 0, endInd = 0
  let i = 0, step = 0
  while (beginInd < nums.length) {
    let max = null
    ++step
    // we want to take the longest possible jump,
    // there's no actual harm doing so.
    // every layer of the search (from beginInd to endInd)
    // allows us to go further until hitting final cell.
    for (i = beginInd; i <= endInd; ++i) {
      if (i + nums[i] > max || max === null)
        max = i + nums[i]
    }
    if (max >= target)
      return step
    beginInd = endInd + 1, endInd = max
  }
}

console.log(jump([2,3,1,1,4]))
