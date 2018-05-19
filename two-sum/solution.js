/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = (nums, target) => {
  const nMap = new Map()
  nums.map((v, ind) => {
    const indices = nMap.has(v) ? nMap.get(v) : []
    indices.push(ind)
    nMap.set(v, indices)
  })

  let ans = null
  for (const [k, kInds] of nMap.entries()) {
    if (ans)
      break
    const remained = target - k
    if (remained === k) {
      // need two element of the same num
      if (kInds.length >= 2) {
        return [kInds[0], kInds[1]]
      }
    } else {
      if (nMap.has(remained)) {
        const rInds = nMap.get(remained)
        return [kInds[0], rInds[0]]
      }
    }
  }
}


console.log(twoSum([2, 7, 11, 7, 15], 14))
