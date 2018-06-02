/**
 * @param {number} n
 * @return {number}
 */
const climbStairs = n => {
  /*
     dp: let f[x] be the # of ways of taking x stairs,
     we have:

     - f[n] = 0 (n < 0)
     - f[0] = 1
     - f[n] = f[n-1] + f[n-2] (n > 1)

     which happens to be the fibonacci sequence.
   */
  if (n < 0)
    return 0
  if (n === 1)
    return 1
  let u = 0, v = 1, w
  for (let i = 1; i <= n; ++i) {
    w = u+v
    u = v
    v = w
  }
  return v
}

for (let i = 0; i < 10; ++i)
  console.log(`${i}, ${climbStairs(i)}`)
