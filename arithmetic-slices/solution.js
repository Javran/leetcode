/**
 * @param {number[]} A
 * @return {number}
 */
const numberOfArithmeticSlices = xs => {
  if (xs.length <= 2)
    return 0

  const ys = new Array(xs.length-1)
  // as we are interested only in diff between nums
  for (let i = 1; i < xs.length; ++i)
    ys[i-1] = xs[i] - xs[i-1]

  let ans = 0
  let i = 0
  while (i < ys.length) {
    const v = ys[i]
    let j = i
    while (j+1 < ys.length && ys[j+1] === v)
      ++j
    if (j-i+1 >= 2) {
      // sequence len: j-i+2
      // we need to count down to 3
      const tmp = j-i+1
      // console.log(v, j-i+2)
      ans += tmp*(tmp-1)/2
    }
    i = j+1
  }
  return ans
}

console.assert(numberOfArithmeticSlices([
  1, 2, 4,
  1, 3, 5, 7, 9, 8,
  7, 7, 7, 7,
  3, -1, -5, -9
]) === 16)

console.assert(numberOfArithmeticSlices([1,2,3,4]) === 3)
console.assert(numberOfArithmeticSlices([1,2,3]) === 1)
