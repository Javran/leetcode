/**
 * @param {number[]} A
 * @return {number}
 */
const peakIndexInMountainArray = xs => {
  let l = 1, r = xs.length - 2
  while (true) {
    const mid = (l + r) >> 1
    const lCond = xs[mid-1] < xs[mid]
    const rCond = xs[mid] > xs[mid+1]
    // since it's guaranteed to be a mountain,
    // it cannot be the case that !lCond && !rCond
    // in other words, xs[mid-1] >= xs[mid] =< xs[mid+1] is impossible.
    if (lCond && rCond)
      return mid
    if (lCond)
      // hitting increasing part, cut left half
      l = mid + 1
    else
      // hitting decreasing part, cut right half
      r = mid - 1
  }
}
