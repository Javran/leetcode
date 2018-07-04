/**
 * @param {number[]} nums
 * @return {number}
 */
const pathSum = nums => {
  // idea: turn it into full binary tree array rep
  // then do path sum as usual.

  // we at most have 1+2+4+8 = 15 elements
  const vals = new Uint8Array(15).fill(0xff)
  nums.forEach(num => {
    // turn to 0-based
    const dep = Math.floor(num / 100) - 1
    const ind = Math.floor((num - (dep+1)*100) / 10) - 1
    const val = num % 10
    // array offset
    const offset = (1 << dep) - 1 + ind
    vals[offset] = val
  })
  let ans = 0
  const getVal = ind =>
    ind < 15 ? vals[ind] : 0xff

  const go = (rootInd, sum) => {
    const rootVal = getVal(rootInd)
    if (rootVal !== 0xff) {
      const curSum = sum + rootVal
      // exactly like binary heap
      const lInd = rootInd*2+1
      const rInd = lInd+1
      const lVal = getVal(lInd)
      const rVal = getVal(rInd)
      if (lVal === 0xff && rVal === 0xff) {
        ans += curSum
      } else {
        go(lInd, curSum)
        go(rInd, curSum)
      }
    }
  }
  go(0, 0)
  return ans
}

console.log(pathSum([
  112,
  213, 228,
  311, 329, 334,
  436, 455
]))
