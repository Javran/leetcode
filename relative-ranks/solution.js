/**
 * @param {number[]} nums
 * @return {string[]}
 */
const findRelativeRanks = nums => {
  // sort while keeping track of indices
  const xs = nums.map((val, ind) => ({val, ind}))
  const ans = new Array(xs.length)
  xs.sort((x,y) => y.val - x.val)
  for (let i = 0; i < xs.length; ++i) {
    const {val, ind} = xs[i]
    const desc =
      i === 0 ? "Gold Medal" :
      i === 1 ? "Silver Medal" :
      i === 2 ? "Bronze Medal" :
      String(i+1)
    ans[ind] = desc
  }
  return ans
}

console.log(findRelativeRanks([5,4,3,2,1]))
