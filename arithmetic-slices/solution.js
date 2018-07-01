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
      /*
         looking for a pattern:

         len: j-i+2, have 1
         len: j-i+1, have 2
         len: ...
         len: 3, have j-i

         therefore we need to add to ans 1,2,...,j-i
         which is n*(n+1) / 2 where n = j-i
       */
      const tmp = j-i
      ans += tmp*(tmp+1)/2
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
