/**
 * @param {number[]} arr
 * @return {number}
 */
const maxChunksToSorted = arr => {
  const revInd = new Int8Array(arr.length)
  arr.forEach((x,ind) => {
    revInd[x] = ind
  })
  let ans = 0
  for (let startInd = 0; startInd < arr.length; /* NOOP */) {
    let endInd = startInd
    // we want to make the minimum chunk in which every element
    // of the chunk can find its final place after sorting,
    // this is done by expanding endInd.
    // note that there's no need of expanding startInd to its left side,
    // as processed elements should have get their indices covered already.
    for (let i = startInd; i <= endInd; ++i) {
      if (revInd[i] > endInd)
        endInd = revInd[i]
    }
    ++ans
    startInd = endInd + 1
  }
  return ans
}

console.log(maxChunksToSorted([2,0,1,4,3,6,5,7]))
console.log(maxChunksToSorted([1,0,2,3,4]))
