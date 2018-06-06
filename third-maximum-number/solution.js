/**
 * @param {number[]} nums
 * @return {number}
 */
const thirdMax = nums => {
  if (nums.length === 1)
    return nums[0]

  // if non-empty: i < j => maxs[i] < maxs[j]
  // therefore maxs[0] if exists is the smallest max
  // and at any point in time: maxs.length <= 3
  let maxs = []
  // floating the number at maxs[i] to keep the invariant stated above
  const floatNum = ind => {
    for (let i = ind; i-1 >= 0; --i) {
      if (maxs[i-1] > maxs[i]) {
        const tmp = maxs[i-1]
        maxs[i-1] = maxs[i]
        maxs[i] = tmp
      } else {
        break
      }
    }
  }
  const update = v => {
    if (maxs.length === 0) {
      maxs = [v]
      return
    }
    if (
      maxs.findIndex(x => x === v) === -1 &&
      (maxs[0] < v || maxs.length < 3)
    ) {
      // have to update
      maxs.push(v)
      floatNum(maxs.length-1)
      if (maxs.length === 4)
        maxs.shift()
    }
  }

  for (let i = 0; i < nums.length; ++i) {
    update(nums[i])
  }

  // insufficient maxs, return the maximum one
  if (maxs.length === 2)
    return maxs[1]

  return maxs[0]
}

console.log(thirdMax([3,2,1]))
console.log(thirdMax([2,2,3,1]))
console.log(thirdMax([1,2]))
console.log(thirdMax([1,1,2]))
console.log(thirdMax([1,2,2,5,3,5]))
