/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
const merge = (xs, m, ys, n) => {
  /*
     - we assume "xs" would have enough space
     - merging result from left to right could get us into trouble
       because we don't want result and original xs to race against each other.
     - however, if we merge from the other side, we can be sure that
       we would never have result area and original xs area overlapped.
   */
  let i = m-1, j = n-1, k = m+n-1
  while (i >= 0 && j >= 0) {
    if (xs[i] <= ys[j]) {
      xs[k] = ys[j]
      --j
    } else {
      xs[k] = xs[i]
      --i
    }
    --k
  }
  // when i >= 0, we know original xs isn't fully merged,
  // but since the result of xs is already in place,
  // we are already done
  if (j >= 0) {
    for (let u = j; u >= 0; --u) {
      xs[k] = ys[u]
      --k
    }
  }
}
