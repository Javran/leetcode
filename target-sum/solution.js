/**
 * @param {number[]} nums
 * @param {number} S
 * @return {number}
 */
const findTargetSumWays = (nums, S) => {
  // idea: basically just try all situations bcs search space is small
  const f = new Array(nums.length+1)
  let cur = new Map([[0, 1]])
  for (let i = 0; i < nums.length; ++i) {
    const next = new Map()
    const num = nums[i]
    cur.forEach((freq, key) => {
      const v1 = next.has(key+num) ? next.get(key+num) : 0
      next.set(key+num, v1 + freq)

      const v2 = next.has(key-num) ? next.get(key-num) : 0
      next.set(key-num, v2 + freq)
    })
    cur = next
  }
  return cur.has(S) ? cur.get(S) : 0
}

console.log(findTargetSumWays([1,1,1,1,1], 3))
