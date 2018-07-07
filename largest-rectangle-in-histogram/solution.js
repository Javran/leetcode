/**
 * @param {number[]} heights
 * @return {number}
 */
const largestRectangleArea = hs => {
  // credit to anton4, the idea looks nice and sound to me.
  if (hs.length === 0)
    return 0
  if (hs.length === 1)
    return hs[0]
  // now that hs.length >= 2
  const N = hs.length
  // preprocess leftmost and rightmost reach
  const leftmost = new Uint32Array(N)
  leftmost[0] = 0
  for (let i = 1; i < N; ++i) {
    if (hs[i] > hs[i-1]) {
      leftmost[i] = i
    } else {
      let j = leftmost[i-1]
      while (j > 0 && hs[j-1] >= hs[i])
        j = leftmost[j-1]
      leftmost[i] = j
    }
  }
  const rightmost = new Uint32Array(N)
  rightmost[N-1] = N-1
  for (let i = N-2; i >= 0; --i) {
    if (hs[i] > hs[i+1]) {
      rightmost[i] = i
    } else {
      let j = i + 1
      while (j < hs.length-1 && hs[j+1] >= hs[i])
        j = rightmost[j+1]
      rightmost[i] = j
    }
  }
  let ans = 0
  for (let i = 0; i < N; ++i) {
    const cur = hs[i]*(rightmost[i] - leftmost[i] + 1)
    if (ans < cur)
      ans = cur
  }
  return ans
}

console.log(largestRectangleArea([2,1,5,6,2,3]))
