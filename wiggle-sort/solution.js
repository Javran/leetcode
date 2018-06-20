/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const wiggleSort = xs => {
  if (!Array.isArray(xs) || xs.length <= 1)
    return
  /*
     the observation is that we can always flip last element with the incoming one
     if the wiggle-ness is not met:
     - for wiggle-sorted xs[..i-1], if we want xs[i-1] <= xs[i], but have xs[i-1] > xs[i]
       swapping xs[i-1] with xs[i] should do the trick,
       as we have xs[i-2] >= xs[i-1] > xs[i], the swap won't
       break the relation between xs[i-2] and xs[i-1] but how we have wiggle-sorted
       xs[..i]
     - similar for the other case.
   */

  for (let i = 1; i < xs.length; ++i) {
    const swap = () => {
      const tmp = xs[i]
      xs[i] = xs[i-1]
      xs[i-1] = tmp
    }
    // here we just want to alternate between two conditions
    if (i & 1) {
      if (xs[i-1] > xs[i])
        swap()
    } else {
      if (xs[i-1] < xs[i])
        swap()
    }
  }
}
