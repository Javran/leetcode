/**
 * @param {number[]} A
 * @return {number}
 */
const numberOfArithmeticSlices = xs => {
  if (xs.length <= 2)
    return 0

  let ansDouble = 0
  let i = 0
  while (i < xs.length-1) {
    const v = xs[i+1] - xs[i]
    let j = i
    while (j+2 < xs.length && xs[j+2] - xs[j+1] === v)
      ++j
    //    j-i+1 >= 2
    // => j-i   >= 1
    const tmp = j-i
    if (tmp >= 1) {
      /*
         looking for a pattern:

         len: j-i+2, have 1
         len: j-i+1, have 2
         len: ...
         len: 3, have j-i

         therefore we need to add to ans 1,2,...,j-i
         which is n*(n+1) / 2 where n = j-i

         optimize: no div here, we leave it until the last moment.
       */
      ansDouble += tmp*(tmp+1)
    }
    i = j+1
  }
  return ansDouble >> 1
}

console.assert(numberOfArithmeticSlices([
  1, 2, 4,
  1, 3, 5, 7, 9, 8,
  7, 7, 7, 7,
  3, -1, -5, -9
]) === 16)

console.assert(numberOfArithmeticSlices([1,2,3,4]) === 3)
console.assert(numberOfArithmeticSlices([1,2,3]) === 1)
