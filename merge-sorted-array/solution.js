/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
const merge = (xs, m, ys, n) => {
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
  if (j >= 0) {
    for (let u = j; u >= 0; --u) {
      xs[k] = ys[u]
      --k
    }
  }
}
