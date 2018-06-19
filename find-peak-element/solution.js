/**
 * @param {number[]} nums
 * @return {number}
 */
const findPeakElement = nums => {
  if (nums.length === 1)
    return 0
  /*
     idea: for a position mid, check lV=num[mid-1], mV=num[mid], rV=num[mid+1]
     - done if we found the peak
     - otherwise use lV < mV or rV < mV to guide which part should we proceed
       (if we were to find a local peak, the best thing to do is excluding the lower part)
   */
  const get = i =>
    (i < 0 || i >= nums.length) ? -Infinity : nums[i]
  let l = 0, r = nums.length
  /*

     intuition of termination and correctness:
     note that for left side we have "-Inf < nums[0]"
     and for right side "nums[n-1] > -Inf"
     cutting either side preserves the "shape"
     so we will eventually reach a peak somewhere

   */
  while (true) {
    const mid = (l + r) >> 1
    const mL = get(mid-1)
    const mR = get(mid+1)
    const midV = get(mid)
    if (mL < midV && mR < midV)
      return mid
    if (mL < midV)
      l = mid
    else
      r = mid
  }
}

console.log(findPeakElement([1,2,1,3,5,6,4]))
