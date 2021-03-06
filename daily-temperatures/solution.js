/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
const dailyTemperatures = ts => {
  // idea: range of temp is narrow,
  // if we keep track of all indices for temps
  // we should have enough time to find min one from it.
  const sz = 100-30+1
  const tsTable = new Array(sz)
  for (let i = 0; i < sz; ++i)
    tsTable[i] = []
  ts.forEach((t, ind) => {
    tsTable[t-30].push(ind)
  })
  const ans = new Array(ts.length)
  ts.forEach((t, ind) => {
    let min = null
    for (let i = t+1; i <= 100; ++i) {
      const tTable = tsTable[i-30]
      if (tTable.length > 0 && tTable[0] > ind) {
        const actualInd = tTable[0]
        if (min === null || min > actualInd - ind)
          min = actualInd - ind
        continue
      }
    }
    if (min === null)
      ans[ind] = 0
    else
      ans[ind] = min
    // current ind is no longer of use.
    tsTable[t-30].shift()
  })
  return ans
}

console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]))
