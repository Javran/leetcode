const genRandomExcl = (l,r) => {
  return l + Math.floor(Math.random()*(r-l))
}

/**
 * @param {number[]} nums
 */
const Solution = function(nums) {
  this.nums = nums
}

/**
 * Resets the array to its original configuration and return it.
 * @return {number[]}
 */
Solution.prototype.reset = function() {
  return this.nums
}

/**
 * Returns a random shuffling of the array.
 * @return {number[]}
 */
Solution.prototype.shuffle = function() {
  const {nums} = this
  const ret = new Array(nums.length)
  for (let i = 0; i < nums.length; ++i) {
    ret[i] = nums[i]
  }
  for (let i = 0; i < nums.length-1; ++i) {
    const j = genRandomExcl(i,nums.length)
    const tmp = ret[i]
    ret[i] = ret[j]
    ret[j] = tmp
  }
  return ret
}

const s = new Solution([1,2,3,4])
const stat = new Map()
for (let i = 0; i < 100000; ++i) {
  const key = s.shuffle().join('')
  if (stat.has(key)) {
    stat.set(key, stat.get(key) + 1)
  } else {
    stat.set(key, 1)
  }
  s.reset()
}

console.log(stat)
