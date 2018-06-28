/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = xs => {
  if (xs.length === 0)
    return 0
  /*
     f[i][0]: if we don't rob house at i
     f[i][1]: rob.
   */
  const f = new Array(xs.length)
  f[0] = [0, xs[0]]
  for (let i = 1; i < xs.length; ++i) {
    const dontRob = Math.max(f[i-1][0], f[i-1][1])
    const doRob = f[i-1][0] + xs[i]
    f[i] = [dontRob, doRob]
  }
  return Math.max.apply(null,f[xs.length-1])
}

console.log(rob([1,2,3,1]))
console.log(rob([2,7,9,3,1]))
