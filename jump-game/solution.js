/**
 * @param {number[]} nums
 * @return {boolean}
 */
const canJump = nums => {
  // TODO: guess there are better ways

  // falsy value by default, no need of filling.
  const reached = new Array(nums.length)
  const queued = new Array(nums.length)
  const queue = [0]
  queued[0] = true
  while (queue.length > 0 && !reached[nums.length-1]) {
    const ind = queue.shift()
    reached[ind] = true
    const jump = nums[ind]
    for (let i = 1; i <= jump; ++i) {
      if (ind+i < nums.length && !queued[ind+i] && !reached[ind+i]) {
        queue.push(ind+i)
        queued[ind+i] = true
      }
      if (ind-i >= 0 && !queued[ind-i] && !reached[ind-i]) {
        queue.push(ind-i)
        queued[ind-i] = true
      }
    }
  }
  return Boolean(reached[nums.length-1])
}

console.log(canJump([2,3,1,1,4]))
console.log(canJump([3,2,1,0,4]))
