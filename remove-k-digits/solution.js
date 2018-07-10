/**
 * @param {string} num
 * @param {number} k
 * @return {string}
 */
const removeKdigits = (numsRaw, k) => {
  const N = numsRaw.length
  const nums = new Int8Array(N)
  for (let i = 0; i < N; ++i)
    nums[i] = numsRaw.codePointAt(i) & 15
  let pickK = N - k
  let beginInd = 0
  const ans = []
  while (pickK >= 1) {
    /*
       while picking pickK values, we want to preserve the last `pickK-1` digits
       so we always have sufficient elements to work with.

       last element: N - 1
       last preserved element: (N - 1) - (pickK - 1) + 1 = N - pickK + 1
     */
    const endInd = N - pickK
    let minN = nums[beginInd], minInd = beginInd
    // minN cannot be less than 0, so if it hits 0, we are done searching.
    for (let i = beginInd+1; i <= endInd & minN !== 0; ++i) {
      if (nums[i] < minN) {
        minN = nums[i]
        minInd = i
      }
    }
    ans.push(minN)
    --pickK
    beginInd = minInd + 1
  }
  let i = 0
  while (i < ans.length && ans[i] === 0)
    ++i
  return i === ans.length ? '0' : ans.slice(i).map(String).join('')
}

console.assert(removeKdigits("1432219",3) === "1219")
console.assert(removeKdigits("10200", 1) === "200")
console.assert(removeKdigits("10", 2) === "0")
