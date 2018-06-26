/**
 * @param {number[]} nums
 * @return {number[]}
 */
const countSmaller = xs => {
  const n = xs.length
  const ys = xs.map((val, ind) => [val, ind, 0 /* the answer to this num */])
  const tmp = new Array(n)
  // do a merge sort, along the way, we can figure out how many reversed pairs are there
  const mergeSort = (l, r) => {
    if (l >= r)
      return
    const mid = (l + r + 1) >> 1
    mergeSort(l, mid-1)
    mergeSort(mid, r)
    let i = l, lInd = l, rInd = mid
    while (lInd < mid && rInd <= r) {
      if (ys[lInd][0] <= ys[rInd][0]) {
        tmp[i] = ys[lInd]
        ++i, ++lInd
      } else {
        // whenever right part gets picked,
        // the picked element creates a reversed pair for
        // all current elements of left part
        for (let j = lInd; j < mid; ++j)
          ys[j][2] += 1
        tmp[i] = ys[rInd]
        ++i, ++rInd
      }
    }
    if (lInd < mid) {
      for (let j = lInd; j < mid; ++j) {
        tmp[i] = ys[j]
        ++i
      }
    }
    if (rInd <= r) {
      for (let j = rInd; j <= r; ++j) {
        tmp[i] = ys[j]
        ++i
      }
    }
    for (let i = l; i <= r; ++i) {
      ys[i] = tmp[i]
    }
  }
  mergeSort(0, n-1)
  const ans = new Array(n)
  ys.forEach(([_ignored, ind, cnt]) => {
    ans[ind] = cnt
  })
  return ans
}

console.log(countSmaller([5,2,6,1]))
