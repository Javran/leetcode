/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const wiggleSort = xs => {
  if (!Array.isArray(xs) || xs.length <= 1)
    return

  for (let i = 1; i < xs.length; ++i) {
    const swap = () => {
      const tmp = xs[i]
      xs[i] = xs[i-1]
      xs[i-1] = tmp
    }
    if (i & 1) {
      if (xs[i-1] > xs[i])
        swap()
    } else {
      if (xs[i-1] < xs[i])
        swap()
    }
  }
}
