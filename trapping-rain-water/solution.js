/**
 * @param {number[]} height
 * @return {number}
 */
const trap = hs => {
  if (!Array.isArray(hs) || hs.length <= 2)
    return 0
  /*

     idea: to compute the sum of trapped water,
     we compute each bin and put it together.
     for the given array, we can break it down into 3 parts:

     - first part is a increasing sequence of bins,
       the amount of water depends on current max-height
       and the height of current bin.

     - second part is between left-most and right-most global maximum bins.
       if we have multiple bins of maximum height, we might trap some water
       in this part as well. Fortunately this part can be processed uniformly
       with first part by simply figuring out the right-most maximum bin.

     - third part is a decreasing sequence, which mirrors the first part.
       In other words, a right-to-left scan until hitting the right-most
       maximum bin should do the trick

   */

  // first scan for the right-most max value
  let maxH = hs[0]
  let maxInd = 0
  let ans = 0
  for (let i = 1; i < hs.length; ++i) {
    const h = hs[i]
    if (h >= maxH) {
      maxH = h
      maxInd = i
    }
  }

  // scan from left
  let curH = hs[0]
  for (let i = 0; i < maxInd; ++i) {
    const h = hs[i]
    if (h < curH) {
      ans += curH - h
    } else {
      // h >= curH
      curH = h
    }
  }

  // scan from right
  curH = hs[hs.length-1]
  for (let i = hs.length-2; i >= maxInd; --i) {
    const h = hs[i]
    if (h < curH) {
      ans += curH - h
    } else {
      curH = h
    }
  }

  return ans
}

console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1]))
console.log(trap([0,1,2,3,4,5]))
console.log(trap([0,1,2,3,4,5,4,3,3,1]))
console.log(trap([0,1,2,3,5,4,5,4,5,3,3,1]))
