/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const threeSum = nums => {
  nums.sort((x,y) => x - y)
  const newNums = []
  for (let i = 0; i < nums.length; ++i) {
    if (newNums.length < 3 || nums[i] !== newNums[newNums.length-3])
      newNums.push(nums[i])
  }
  nums = newNums

  const selected = []
  const pairs = new Map()
  const pairFound = (a,b) => pairs.set(`${a},${b}`,[a,b,-a-b])
  const search = beginInd => {
    if (selected.length == 2) {
      if (beginInd >= nums.length)
        return
      const target = -selected[0]-selected[1]
      let loInd = beginInd, hiInd = nums.length-1
      while (loInd <= hiInd) {
        let midInd = Math.floor((hiInd+loInd) / 2)
        if (nums[midInd] == target) {
          pairFound(selected[0],selected[1])
          return
        } else if (nums[midInd] < target) {
          loInd = midInd + 1
        } else {
          // nums[midInd] > target
          hiInd = midInd - 1
        }
      }
    } else {
      for (let i = beginInd; i < nums.length; ++i) {
        selected.push(nums[i])
        search(i+1)
        selected.pop()
      }
    }
  }
  search(0)
  return [...pairs.values()]
}

console.log(threeSum([-1, 0, 1, 2, -1, -4]))
console.log(threeSum([-1,-1,-1,-1, 1,1,1,1,1,3,4,4,4,4,4,5,5,5,5,7,7,8,9,9]))
