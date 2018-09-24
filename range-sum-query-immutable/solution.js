/**
 * @param {number[]} nums
 */
const NumArray = function(nums) {
  const acc = new Int32Array(nums.length+1)
  for (let i = 0; i < nums.length; ++i) {
    acc[i+1] = acc[i] + nums[i]
  }

  this.acc = acc
}

/**
 * @param {number} i
 * @param {number} j
 * @return {number}
 */
NumArray.prototype.sumRange = function(i, j) {
  const {acc} = this
  return acc[j+1] - acc[i]
}
